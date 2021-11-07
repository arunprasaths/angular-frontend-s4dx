import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string=''; 
  constructor(private auth:AuthService) { }

  loggedInUser$:Observable<User> = this.auth.loggedInUserSubject$;

  ngOnInit(): void {

  }
}
