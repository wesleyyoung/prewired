import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ApiService, Project } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { stringify } from '@angular/core/src/util';

export interface CollaboratorUser {
  name: string;
  phone: string;
  id: string;
}

export interface Collaborator {
  name: string;
  address: string;
  phone: string;
  zip: string;
  state: string;
  users: CollaboratorUser[];
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  public projects: Project[] = [];
  public projectsObserve: BehaviorSubject<Project[]> =  new BehaviorSubject([]);

  constructor(
    private auth: AuthService,
    private api: ApiService
  ) {
    this.auth.companyObject.subscribe(company => {
      console.log('change auth state');
      this.refresh();
    });
  }

  public getProjectById($id: string, $done: Function): void {
    for (var i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id == $id) {
        $done(this.projects[i]);
        break;
      }
    }
  }

  public refresh() {
    if (this.auth.company) {
      this.api.getProjectSet(projects => {
        this.projects = projects;
        this.projectsObserve.next(this.projects);
      });
    } else {
      this.projects = [];
      this.projectsObserve.next(this.projects);
    }
  }

  public submitComment(comment: string, projectId: string, $done: Function) {
    this.api.talk('submit-comment', {
      text: comment,
      userId: this.auth.user.id,
      projectId: projectId
    }, res => {
      $done(res);
    });
  }

  public refreshAsync($done: Function): void {
    if (this.auth.company) {
      this.api.getProjectSet(projects => {
        this.projects = projects;
        this.projectsObserve.next(this.projects);
        $done();
      });
    } else {
      this.projects = [];
      this.projectsObserve.next(this.projects);
      $done();
    }
  }

  public getCollaborators($projectId: string, $done: Function): void {
    this.api.talk('get-collaborators', {
      projectId: $projectId
    }, res => {
      if (res.success) {
        $done(res.collaborators);
      } else {
        console.log(res.msg);
        $done(null);
      }
    });
  }

  public inviteCollaborator($projectId: string, $email: string, $done: Function): void {
    this.api.talk('send-project-invite', {
      projectId: $projectId,
      email: $email,
      userId: this.auth.user.id
    }, res => {
      $done(res);
      console.log(res);
    });
  }

  public createProject($newProject: Project, $done: Function): void {
    this.api.createProject($newProject, res => {
      this.refreshAsync(() => {
        $done();
      });
    });
  }
}
