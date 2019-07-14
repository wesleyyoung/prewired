import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Project, Comment } from '../api.service';
import { ProjectApiService, Collaborator } from '../project-api.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss'],
})
export class ProjectDashboardComponent implements OnInit {

  public project: Project = this.api.blankProject();
  public loading: any;
  public clockedIn: boolean = false;

  public newComment: string = '';

  public sendToEmail: string = '';

  public collaborators: Collaborator[];

  constructor(
    private api: ApiService,
    private activeRoute: ActivatedRoute,
    private auth: AuthService,
    private project_api: ProjectApiService
  ) {
    this.newComment = '';
  }

  doRefresh(event) {
    this.project_api.refreshAsync(() => {
      event.target.complete();
    });
  }

  toggleClock() {
    this.clockedIn = !this.clockedIn;
  }

  refresh() {
    this.project_api.refresh();
  }

  getCollabs() {
    this.project_api.getCollaborators(this.project.id, collabs => {
      this.collaborators = collabs
    });
  }

  invite() {
    this.project_api.inviteCollaborator(this.project.id, this.sendToEmail, res => {
      this.sendToEmail = '';
      this.refresh();
    });
  }

  submitComment() {
    this.project_api.submitComment(this.newComment, this.project.id, res => {
      this.newComment = '';
      this.refresh();
    });
  }

  ngOnInit() {
    this.project_api.projectsObserve.subscribe(() => {
      this.project_api.getProjectById(this.project.id, project => {
        this.project = project;
        this.getCollabs();
      });
    });
    this.activeRoute.params.subscribe(() => {
      let routeParams: any = this.activeRoute['_futureSnapshot'].parent.params;
      this.project_api.getProjectById(routeParams.id, project => {
        this.project = project;
        this.getCollabs();
      });
    });
  }
}
