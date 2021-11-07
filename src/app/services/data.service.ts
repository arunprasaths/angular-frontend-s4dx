import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, pluck, shareReplay, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';
import { SamplePerType } from '../models/samplespertype';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  chartdata$ = this.http.get<SamplePerType[]>(`${environment.baseUrl}/samples-chart`).pipe(
    pluck('samplesPerType'),
    shareReplay(1),
    catchError(this.handleError)
  );

  allOrders$ = this.http.get<Order[]>(`${environment.baseUrl}/orders`).pipe(
    shareReplay(1),
    catchError(this.handleError)
  );

  private handleError(err: any):Observable<any> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(()=> errorMessage);
  }

}
