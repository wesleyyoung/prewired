import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Project } from '../api.service';
import { AuthService } from '../auth/auth.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {

  public newProject: Project = this.api.blankProject();

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private project_api: ProjectApiService
    ) { 
  }

  public create(){
    this.project_api.createProject(this.newProject, res => {
      console.log(res);
      this.router.navigate(['./project/' + this.newProject.id]);
    });
  }

  ngOnInit() {
    
  }

}
