import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  onSubmit() {
    this.auth.login(this.loginForm.value).subscribe((data) => {
      this.router.navigate(['/']);
    });
  }
}
