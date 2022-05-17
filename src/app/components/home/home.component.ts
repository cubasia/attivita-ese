import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { catchError, Observable, of, Subject, Subscription, takeUntil } from 'rxjs';
import { Attivita } from 'src/app/models/attivita';
import { ActivityService } from '../../services/activity.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private myService: ActivityService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  unsubscribe$: Subject<void> = new Subject<void>();

  listTipi = [
    'education',
    'recreational',
    'social',
    'diy',
    'charity',
    'cooking',
    'relaxation',
    'music',
    'busywork',
  ];
  errore = true;
  profileForm = new FormGroup(
    {
      tipo: new FormControl(''),
      partecipanti: new FormControl(''),
      prezzo: new FormControl('0'),
    },
    { validators: this.controlla }
  );
  controlla(control: AbstractControl): ValidationErrors | null {
    let parte = control.get('partecipanti')?.value ?? 0;
    let acty = control.get('tipo')?.value ?? 0;
    let prezzo = control.get('prezzo')?.value ?? 0;
    return parte + acty + prezzo < 0.1 ? { controlla: true } : null;
    //
  }

  mostraErrore(errore: any): ValidationErrors | null {
    this.errore = true;
    if (errore < 1) {
      setTimeout(() => {
        this.errore = false;
      }, 2000);
    }
    return errore;
  }

  prezzoCorrente = 0;
  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.warn(this.profileForm.value);
    let parte = this.profileForm.get('partecipanti')?.value ?? 0;
    let acty = this.profileForm.get('tipo')?.value ?? 0;
    let prezzo = this.profileForm.get('prezzo')?.value ?? 0;
    let myparameters: string[] = [];
    if (parte != 0) myparameters = [...myparameters, 'participants=' + parte];
    if (acty != 0) myparameters = [...myparameters, 'type=' + acty];
    if (prezzo != 0) myparameters = [...myparameters, 'price=' + prezzo];

    // console.log(myparameters.length);

    // let risposta = this.myService.getWithParameters(myparameters).pipe(
    //   catchError(err => of ({"error":err.message}))
    // )
    let risposta = this.myService.getWithParameters(myparameters)

  //  risposta.subscribe(x=> console.log(x))
    this.myService.trovataAttivita(risposta).subscribe(
      (x) =>
        x
          ? this.toastr.warning('Attività non trovata', 'Ohh Ohh')
          : this.verificaEsistenza(risposta),
      (error) => this.toastr.error(error.message, error.status + ' ' +error.statusText)
    );

  }
  verificaEsistenza(item: Observable<Attivita>) {
    this.myService.esisteattivita(item).subscribe((x) => {
      x
        ? this.toastr.warning('Attività già trovata', 'Ohh Ohh')
        : this.inseriscieMostra(item);
    });
  }
  inseriscieMostra(item: Observable<Attivita>) {
    item.subscribe((x) => this.salvaechiama(x));
  }

  salvaechiama(item: Attivita) {
    this.myService.salvaattivita(item);
    this.router.navigateByUrl('list');
  }
  ngOnInit(): void {
    let sub = this.profileForm.get('prezzo')?.valueChanges.
      pipe(takeUntil(this.unsubscribe$))
      .subscribe((x) => {
      this.prezzoCorrente = x;
    });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
