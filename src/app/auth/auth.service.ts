import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { Storage } from  '@ionic/storage';
import { User, UserLoginRequest, CompanyAccountModel, AuthResponse } from  './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:5080';
  authSubject  =  new  BehaviorSubject(false);
  userObject = new BehaviorSubject<User>(null);
  companyObject = new BehaviorSubject<CompanyAccountModel>(null);

  public user: User = null;
  public company: CompanyAccountModel = null;

  constructor(
    private httpClient:  HttpClient,
    private storage:  Storage,
    private router: Router) {
      this.companyObject.subscribe(company => {
        this.company = company;
      });
      this.userObject.subscribe(user => {
        this.user = user;
      });
  }

  register(user: CompanyAccountModel): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/signup`, user).pipe(
      tap(async (res:  AuthResponse ) => {
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.access_token);
          this.authSubject.next(true);
        }
      })
    );
  }

  login(user: UserLoginRequest): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/login`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res.user) {
          this.userObject.next(res.user);
          this.companyObject.next(res.company);
          await this.storage.set("ACCESS_TOKEN", res.access_token);
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    this.authSubject.next(false);
    this.companyObject.next(null);
    this.userObject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
