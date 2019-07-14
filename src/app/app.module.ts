import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
 
import { IonicStorageModule } from '@ionic/storage';

import { Socket, SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProjectComponent } from './project/project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SettingsComponent } from './settings/settings.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { PullWireComponent } from './pull-wire/pull-wire.component';
import { BuildComponent } from './build/build.component';
import { AuthModule } from './auth/auth.module';
import { CompanySignupComponent } from './company-signup/company-signup.component';
import { LoginComponent } from './login/login.component';
import { ProjectPictureUploadComponent } from './project-picture-upload/project-picture-upload.component';

const config: SocketIoConfig = { url: 'http://localhost:5080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    NotificationsComponent,
    ProjectComponent,
    CreateProjectComponent,
    SettingsComponent,
    ProjectDashboardComponent,
    PullWireComponent,
    BuildComponent,
    CompanySignupComponent,
    LoginComponent,
    ProjectPictureUploadComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    FormsModule,
    AuthModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    WebView,
    FilePath,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
