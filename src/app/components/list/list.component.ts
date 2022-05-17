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

  get getLista(): Attivita[] {
    return this.myService.attivitaChiamate;
  }
// price(price: number): string {
//     if (price === 0) {
//       return 'gratis';
//     } else if (price >= 0.1 && price <= 0.5) {
//       return 'basso';
//     } else if (price > 0.5 && price < 1) {
//       return 'medio';
//     } else if (price === 1) {
//       return 'alto';
//     } else {
//       return 'medio';
//     }
  // }

  // ritorna() {
  //   this.router.navigateByUrl('activity');
  // }
  dettagli(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }
  ngOnInit(): void {}
}
