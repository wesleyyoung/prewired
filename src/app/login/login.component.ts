import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthResponse } from '../auth/user';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public msg: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService
  ) { }

  login() {
    this.api.showLoading(() => {
      try {
        this.auth.login({
          email: this.email,
          password: this.password
        }).subscribe({
          next: (req) => {
            this.api.closeLoading();
            if (req.success) {
              console.log(this.auth.company);
              this.router.navigate(['/']);
            }
          }, 
          error: (err) => {
            this.api.closeLoading();
            this.msg = err.error.msg;
          } 
        });
      } catch(e) {
        console.log(e);
      }
    }, 'Logging you in...');

  }

  ngOnInit() { }

}
