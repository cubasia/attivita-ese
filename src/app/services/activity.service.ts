import { Injectable } from '@angular/core';
import { HttpclientService } from './HttpClient/HttpClientServices';
import { Attivita } from '../models/attivita';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';
const BASE_URL = 'http://www.boredapi.com/api/activity';

@Injectable({
  providedIn: 'root',
})
//const Tipi="?type=recreational",participants
export class ActivityService {
  constructor(private http: HttpclientService) {}
  private savedlist: Attivita[] = [];

  get attivitaChiamate(): Attivita[] {
    return this.savedlist;
  }
  getWithParameters(parameters: string[]): Observable<Attivita>  {
    let url = BASE_URL;
    let k = 0;
    // console.log(parameters.length);

    for (let i = 0; i < parameters.length; i++) {
      if (k == 0) {
        url += '?' + parameters[i];
        k++;
      } else url += '&' + parameters[i];
    }
    console.log(url);
    return this.http.getWithUrl<Attivita>(url);
    // . pipe(
    // catchError((_error) => {
    //   null
    // })
  }
  salvaattivita(attivita: Observable<Attivita>): void {
    attivita.subscribe((x) => (this.savedlist = [...this.savedlist, x]));
  }
  esisteattivita(attivita: Observable<Attivita>): Observable<boolean> {

    return attivita.pipe(switchMap(x => {
        return of(this.savedlist.includes(x));
        }))

  }
}
