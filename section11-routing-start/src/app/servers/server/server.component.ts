import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  
  constructor(private serversService: ServersService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
     this.route.data
      .subscribe(
        (data: Data) => {
          this.server = data['server'];
        }
      );

      
    //console.log(this.route.snapshot.params['id']);

    // the + is used to convert string to number
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);

    // this.route.params.subscribe(
    //   (params: Params) => {          
    //     this.server = this.serversService.getServer(+params['id']);                
    // });
  }

  onEdit(){
    // const id = this.route.snapshot.params['id'];
    // this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
    //Another way to do the same thing
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }



}
