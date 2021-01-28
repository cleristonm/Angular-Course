import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  inactivations : number = 0;
  activations : number = 0;

  constructor() { }

  addActivation(){
    this.activations++;
    this.printLog();
  }

  addInactivation(){
    this.inactivations++;
    this.printLog();
  }

  printLog(){
    console.log("It has done "+this.activations+" activations");
    console.log("It has done "+this.inactivations+" inactivations");
  }
}
