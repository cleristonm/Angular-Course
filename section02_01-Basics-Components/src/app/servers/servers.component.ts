import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'app-servers',
  // selector: '[app-servers]',
  selector: 'app-servers',
  // template: `
  // <app-server></app-server>
  // <p>HI</p>
  // <app-server></app-server>
  // `,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreationStatus = "No server was created";
  serverName = 'TesteServer';
  serverCreated = false;
  servers = ["Test", "Production", "Development"]



  constructor() { 
    setTimeout( () => { 
        this.allowNewServer = true 
      }, 2000);

  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreationStatus = 'Server was created! Name is '+this.serverName;
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: any){
    this.serverName = (<HTMLInputElement>event.target).value;

  }

}