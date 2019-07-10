import { Component, OnInit } from '@angular/core';
import { Project } from '../api.service';
import { ProjectApiService } from '../project-api.service';
import { AuthService } from '../auth/auth.service';
import { CompanyAccountModel, User } from '../auth/user';
import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public projects: Project[] = this.project_api.projects;
  public openProjectsCount: number = 0;
  public company: CompanyAccountModel = this.auth.company;
  public user: User = this.auth.user;

  constructor(
    private project_api: ProjectApiService,
    private auth: AuthService
  ) {
    this.openProjectsCount = 0;
    for (var i = 0; i < this.projects.length; i++) {
      if (!this.projects[i].finished) this.openProjectsCount++;
    }
  }

    ngOnInit() {
      this.project_api.projectsObserve.subscribe(projects => {
        this.openProjectsCount = 0;
        this.projects = projects;
        for (var i = 0; i < this.projects.length; i++) {
          if (!this.projects[i].finished) this.openProjectsCount++;
        }
      });
      this.auth.userObject.subscribe(user => {
        this.user = user;
      });
      this.auth.companyObject.subscribe(company => {
        this.company = company;
      });
    }

}
