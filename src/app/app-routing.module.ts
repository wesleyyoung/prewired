import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProjectComponent } from './project/project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SettingsComponent } from './settings/settings.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { PullWireComponent } from './pull-wire/pull-wire.component';
import { BuildComponent } from './build/build.component';
import { CompanySignupComponent } from './company-signup/company-signup.component';
import { LoginComponent } from './login/login.component';
import { ProjectPictureUploadComponent } from './project-picture-upload/project-picture-upload.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'companySignup',
    component: CompanySignupComponent
  },{
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'projects',
    component: ProjectsComponent
  }, {
    path: 'project/:id',
    component: ProjectComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
        path: 'dashboard',
        component: ProjectDashboardComponent
      }, {
        path: 'pullWire',
        component: PullWireComponent
      }, {
        path: 'build',
        component: BuildComponent
      }, {
        path: 'upload',
        component: ProjectPictureUploadComponent
      }
    ]
  }, {
    path: 'createProject',
    component: CreateProjectComponent
  }, {
    path: 'notifications',
    component: NotificationsComponent
  }, {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
