import { Component, OnInit } from '@angular/core';
import { ApiService, Project } from '../api.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {

  public projects: Project[] = this.project_api.projects;

  constructor(
    private api: ApiService,
    private project_api: ProjectApiService
  ) { }

  doRefresh(event) {
    this.project_api.refreshAsync(() => {
      event.target.complete();
    });
  }

  ngOnInit() {
    this.project_api.projectsObserve.subscribe(projects => {
      this.projects = projects;
    });
  }

}
