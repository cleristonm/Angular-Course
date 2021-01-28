import { Injectable, OnInit } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit{
  activeUsers = [ 'Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) { }

  inactivateUser(position: number){
    this.inactiveUsers.push(this.activeUsers[position]);
    this.activeUsers.splice(position,1);    
    this.counterService.addInactivation();
  }

  activateUser(position: number){
    this.activeUsers.push(this.inactiveUsers[position]);
    this.inactiveUsers.splice(position,1);
    this.counterService.addActivation();    
  }
}
