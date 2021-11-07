import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from "moment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();

  loggedInUser: User = { Name: '', Email: '', Exp: new Date(), Role: [] };
  private loggedInUserSubject = new BehaviorSubject<User>({ Name: '', Email: '', Exp: new Date(), Role: [] });
  loggedInUserSubject$ = this.loggedInUserSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdminSubject$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient,
    private router: Router) { }

  login(loginUser: any):Observable<User> {
    let loginRelativePath = (loginUser.username == 'admin') ? 'login-admin' : 'login';

    return this.http.post(`${environment.baseUrl}/${loginRelativePath}`, loginUser)
    .pipe(
      map((result: any) => {
        this.decodeToken(result);
        this.setSession(result);
        return this.loggedInUser;
      })
    );
  }

  private decodeToken(result:any){
    const decodedToken = this.helper.decodeToken(result.access_token);
    if (decodedToken) {
      this.loggedInUser = decodedToken;
      this.loggedInUserSubject.next(decodedToken);
      //check for admin permission
      this.isAdminSubject.next(this.loggedInUser.Role.includes('ADMIN'));
    }
  }

  private setSession(result: any) {
    localStorage.setItem('id_token', result.access_token);
  }

  logout() {
    localStorage.removeItem("id_token");
    this.router.navigate(['/login']);
  }  

  public isLoggedIn() {
    //return moment().isBefore(this.getExpiration());

    const token = localStorage.getItem('id_token');
    if (token) {
      return !this.helper.isTokenExpired(token);
    }
    else {
      return false;
    }
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }


  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    //const expiresAt = JSON.parse(expiration);
    return moment(expiration);
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
  }
}
