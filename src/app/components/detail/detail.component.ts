import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Attivita } from 'src/app/models/attivita';
import { ActivityService } from 'src/app/services/activity.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  currentRoute: any;
  constructor(
    private myService: ActivityService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // console.log(this.router.url);
    // let dividi=this.router.url.split("/")
    // this.attivita?=this.getLista.find(a => a.key==dividi[dividi.length-1])
      }

  get getLista(): Attivita[] {
    return this.myService.attivitaChiamate;
  }

  attivita?:Attivita
  ngOnInit(): void {
    let dividi = this.router.url.split('/');
    this.attivita = this.getLista.find((a) => a.key == dividi[dividi.length - 1])
  }
  ritorna(): void {
this.router.navigateByUrl('activity');
  }
}
