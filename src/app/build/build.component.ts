import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Project, Room } from '../api.service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
})
export class BuildComponent implements OnInit {

  public project: Project = this.api.blankProject();

  constructor(
    private api: ApiService,
    private activeRoute: ActivatedRoute
  ) { }

  addRoom(): void {
    let newRoom: Room = this.api.blankRoom();
    newRoom.name = 'New Room ' + (this.project.rooms.length + 1);
    this.api.addRoomToProject(newRoom, this.project.id, () => {
      this.loadRooms();
    });
  }

  loadRooms(): void {
    let routeParams: any = this.activeRoute['_futureSnapshot'].parent.params;
    this.api.getProjectById(routeParams.id, project => {
      this.project = project;
    });
  }

  ngOnInit() {
    this.api.showLoading(() => {
      this.activeRoute.params.subscribe(() => {
        this.loadRooms();
        this.api.closeLoading();
      });
    });
    
  }
}
