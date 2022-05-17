import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
    catchError((httpErrorResponse: HttpErrorResponse) => {

         // Customize as you wish:
        const newHttpErrorResponse = new HttpErrorResponse( {
          error: httpErrorResponse.error,
          status: httpErrorResponse.status,
          statusText: httpErrorResponse.statusText,
          // headers: httpErrorResponse.headers,
          // url: httpErrorResponse.url
        });
      return throwError(newHttpErrorResponse)

        // return Observable.throw(newHttpErrorResponse);
      })
       )
    }
}
