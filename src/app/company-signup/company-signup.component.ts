import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { CompanyAccountModel } from '../auth/user';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html',
  styleUrls: ['./company-signup.component.scss'],
})
export class CompanySignupComponent implements OnInit {

  public states: string[] = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
  public selectedState: string = '';

  public newAccount: CompanyAccountModel = {
    id: (new Date().getTime() / 1000).toString(),
    name: '',
    projects: [],
    address: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    users: [{
      id: ((new Date().getTime() / 1000) * 12384).toString(),
      name: '',
      email: '',
      username: '',
      password: '',
      tier: 1,
      chats: []
    }]
  }

  @ViewChild("slider") slider: IonSlides;

  slideOpts = {
    initialSlide: 0,
    lockSwipes: true,
    speed: 400
  };

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {

  }

  slideNext() {
    this.slider.lockSwipeToNext(false);
    this.slider.slideNext().then(() => {
      this.slider.lockSwipeToNext(true);
    });
  }

  create() {
    this.api.showLoading(() => {
      try {
        this.auth.register(this.newAccount).subscribe({
          next: (req) => {
            this.api.closeLoading();
            this.api.showLoading(() => {
              this.auth.login({
                email: this.newAccount.users[0].email,
                password: this.newAccount.users[0].password
              }).subscribe({
                next: (l_req) => {
                  this.api.closeLoading();
                  if (req.success) {
                    this.router.navigate(['/']);
                  }
                },
                error: (err) => {
                  this.api.closeLoading();
                  console.log(err.error);
                }
              })
            }, 'Logging you in...');
          },
          error: (err) => {
            this.api.closeLoading();
            console.log(err.error);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }, 'Creating Account...');
  }

  ngOnInit() {
    console.log(this.slider);
    this.slider.lockSwipeToNext(true);
  }

}
