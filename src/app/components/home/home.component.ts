import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Attivita } from 'src/app/models/attivita';
import { ActivityService } from '../../services/activity.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private myService: ActivityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
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
    if (acty != 0) myparameters = [...myparameters, 'type='+acty];
    if (prezzo != 0) myparameters = [...myparameters, 'price='+prezzo];

    // console.log(myparameters.length);

    let risposta = this.myService.getWithParameters(myparameters);
    this.myService
      .esisteattivita(risposta)
      .subscribe((x) =>
        {
          x ? console.log('gia chiamata') : this.inseriscieMostra(risposta);
        }
      );
  }
  inseriscieMostra(item: Observable<Attivita>) {
    // console.log("sono qui")
    item.subscribe(x => this.salvaechiama(x)
    )}

  salvaechiama(item: Attivita) {
    this.myService.salvaattivita(item)
        this.router.navigateByUrl('list')
  }
  ngOnInit(): void {
    this.profileForm.get('prezzo')?.valueChanges.subscribe((x) => {
      this.prezzoCorrente = x;
    });
  }
}
