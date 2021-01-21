import { Component } from '@angular/core';
import { EvenComponent } from './even/even.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  evenNumbers: number[] = [];
  oddNumbers: number[] = [];

  onStartOutputEvent(count:number){
    if (count % 2 === 0){
      this.evenNumbers.push(count);
    }else{
      this.oddNumbers.push(count);
    }
  }
}
