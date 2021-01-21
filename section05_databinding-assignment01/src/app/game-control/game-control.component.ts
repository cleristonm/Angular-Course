import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  interval: NodeJS.Timeout;
  count = 0;
  @Output() startOutputEvent = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onStartClick(){
    this.interval = setInterval( () => {      
      this.startOutputEvent.emit(this.count+1);
      this.count++;
    }, 1000)
  }

  onStopClick(){
    clearInterval(this.interval);
  }
}
