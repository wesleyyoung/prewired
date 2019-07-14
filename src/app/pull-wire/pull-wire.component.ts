import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Project } from '../api.service';

@Component({
  selector: 'app-pull-wire',
  templateUrl: './pull-wire.component.html',
  styleUrls: ['./pull-wire.component.scss'],
})
export class PullWireComponent implements OnInit {

  public project: Project = this.api.blankProject();

  constructor(
    private api: ApiService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(() => {
      let routeParams: any = this.activeRoute['_futureSnapshot'].parent.params;
      this.api.showLoading(() => {
        this.api.getProjectById(routeParams.id, project => {
          this.api.closeLoading();
          this.project = project;
        });
      });
    });
  }

}
