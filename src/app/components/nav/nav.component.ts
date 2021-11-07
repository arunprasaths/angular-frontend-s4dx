import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth:AuthService, 
              private router:Router) { }
  
  loggedInUser$:Observable<User> = this.auth.loggedInUserSubject$;
  isAdmin$:Observable<boolean> = this.auth.isAdminSubject$;

  isLoggedIn(){
    return this.auth.isLoggedIn();
  }

  logout(){
    this.auth.logout();
  }

  ngOnInit(): void {
  }
}
