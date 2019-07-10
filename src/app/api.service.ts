import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth/auth.service';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  timeCardEvents: TimeCard[];
  tier: number;
}

export interface CompanyAccount {
  id: string;
  name: string;
  projects: string[];
  address: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  users: UserAccount[];
}

export interface TimeCard {
  clockedIn: boolean;
  userId: string;
  companyId: string;
  projectId: string;
  time: Date;
}

export interface Pull {
  id: string;
  wire: string;
  fromId: string;
  toId: string;
}

export interface Conduit {
  id: string;
  diameter: number;
  fromId: string;
  toId: string;
}

export interface WallPlate {
  id: string;
  gang: number;
}

export interface MediaPanel {
  id: string;
  width: number;
  height: number;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  pulls: Pull[];
  wallPlates: WallPlate[];
  mediaPanels: MediaPanel[];
  conduitRuns: Conduit[];
}

export interface Comment {
  author: string;
  text: string;
  date: Date;
  replies: Comment[];
}

export interface GroupConvo {
  authorizedAccounts: string[],
  updates: {
    date: Date;
    type: string;
    content: string;
    author: string;
    id: string;
  }[],
  messages: {
    from: string;
    fromUserId: string;
    id: string;
    content: string;
    date: Date;
    seenBy: string[];
  }[]
}

export interface Update {
  date: Date;
  type: string;
  content: string;
  author: string;
  id: string;
}

export interface Pic {
  description: string;
  img: string;
  content_type: string;
  date_uploaded: Date;
  uploaded_by: String;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  pics: Pic[];
  comments: Comment[];
  group_convo: GroupConvo;
  updates: Update[];
  description: string;
  finished: boolean;
  rooms: Room[],
  clocks: TimeCard[];
  meta: {
    date: Date;
    creatorId: string;
    authorizedAccounts: string[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public talk($path: string, $data: any, $done: any): void {
    this.socket.emit($path, $data);
    this.socket.on($path + 'RETURN', (data) => {
      this.socket.removeAllListeners($path + 'RETURN');
      $done(data);
    });
  }

  constructor(
    public loadingController: LoadingController,
    private socket: Socket,
    private auth: AuthService
  ) { }

  public getProjectSet($done: Function): void {
    this.talk('get-project-set-by-id', {
      id: this.auth.company.id
    }, (res) => {
      console.log(res.projects);
      $done(res.projects);
    });
  }

  public async showLoading($done: Function, $title?: string) {
    const loading = await this.loadingController.create({
      message: $title || 'Please Wait...',
      id: 'wait'
    });
    await loading.present();
    $done();
  }

  public closeLoading() {
    const loading = this.loadingController.dismiss({}, null, 'wait');
  }

  public createProject($project: Project, $done: Function): void {
    this.talk('create-project', {
      newProject: $project,
      creatorId: this.auth.company.id
    }, res => {
      $done(res);
    });
  }

  public addRoomToProject($room: Room, $id: string, $done: Function) {

  }

  public getProjectById($id: string, $done: Function): void {
    this.talk('get-project', { id: $id }, res => {
      $done(res.project);
    });
  }

  public blankProject(): Project {
    let d = new Date();
    return {
      id: (d.getTime() / 1000).toFixed(0).toString(),
      type: '',
      title: '',
      location: '',
      description: '',
      pics: [],
      updates: [],
      group_convo: {
        authorizedAccounts: [ this.auth.user.id ],
        updates: [],
        messages: []
      },
      comments: [],
      finished: false,
      rooms: [],
      clocks: [],
      meta: {
        date: new Date(),
        creatorId: '',
        authorizedAccounts: [],
      }
    };
  }

  public blankRoom(): Room {
    let d = new Date();
    return {
      id: ((d.getTime() / 1000) * Math.floor((Math.random() * 10) + 1)).toFixed(0).toString(),
      name: '',
      description: '',
      pulls: [],
      conduitRuns: [],
      wallPlates: [],
      mediaPanels: []
    }
  }
}
