import { Injectable } from '@angular/core';
import { HttpclientService } from './HttpClient/HttpClientServices';
import { Attivita } from '../models/attivita';
import {  Observable, of, switchMap } from 'rxjs';

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

  getAttivita(id: string): Observable<Attivita> {
    let result = this.savedlist.find((a) => a.key == id)
    if (result) {
      return of(result)
    }
    else {
        let url = BASE_URL + '?key=' + id;
        return  this.http.getWithUrl<Attivita>(url)
      }
    }

  getWithParameters(parameters: string[]): Observable<Attivita>  {
    let url = BASE_URL;
    let k = 0;
    for (let i = 0; i < parameters.length; i++) {
      if (k == 0) {
        url += '?' + parameters[i];
        k++;
      } else url += '&' + parameters[i];
    }
    //  console.log(url);
    return this.http.getWithUrl<Attivita>(url);
  }
  salvaattivita(attivita:Attivita): void {
    this.savedlist = [...this.savedlist, attivita];
  }
  esisteattivita(attivita: Observable<Attivita>): Observable<boolean> {

    return attivita.pipe(switchMap(x => {
      //  console.log(x.key)
        return of(this.savedlist.some(y=>JSON.stringify(y)===JSON.stringify(x)));
        }))
  }
  trovataAttivita(attivita: Observable<Attivita>): Observable<boolean> {
    return attivita.pipe(switchMap(x =>"error" in x ? of(true):of (false))
    )
  }
}
