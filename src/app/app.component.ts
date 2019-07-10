import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { ProjectApiService } from './project-api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [{
    title: 'Home',
    url: '/home',
    icon: 'home'
  }, {
    title: 'Projects',
    url: '/projects',
    icon: 'construct'
  }, {
    title: 'Notifications',
    url: '/notifications',
    icon: 'chatboxes'
  }, {
    title: 'Settings',
    url: '/settings',
    icon: 'build'
  }
  ];

  private isLoggedIn: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AuthService,
    public menuCtrl: MenuController,
    private project_api: ProjectApiService
  ) {
    this.initializeApp();
    this.auth.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (!loggedIn) this.menuCtrl.enable(false);
      else this.menuCtrl.enable(true);
    });
    this.activeRoute.url.subscribe(state => {
      console.log(this.activeRoute.url);
      if (this.router.parseUrl.toString() !== '/companySignup') {
        if (!this.isLoggedIn) {
          this.router.navigate(['/login']);
        } else {

        }
      } else {

      }
    });
  }

  logout() {
    this.auth.logout();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
