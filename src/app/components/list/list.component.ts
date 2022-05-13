import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attivita } from 'src/app/models/attivita';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private myService: ActivityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get   getLista():Attivita[] {
   return this.myService.attivitaChiamate
  }
  ritorna() {
    this.router.navigateByUrl('activity');
  }
  dettagli(url:string) {
     this.router.navigate([url], { relativeTo: this.route });
  }
  ngOnInit(): void {}
}
