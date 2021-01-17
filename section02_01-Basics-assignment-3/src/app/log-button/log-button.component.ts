import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-button',
  templateUrl: './log-button.component.html',
  styleUrls: ['./log-button.component.css'],
  styles: [`
        .classLog {
            color: white;
        }
    `]
})
export class LogButtonComponent implements OnInit {
  showDetails = false;
  log = []

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowDetails(){
    this.showDetails = !this.showDetails;
    var nowDateTime = new Date();
    this.log.push("The details was "+(this.showDetails===false ? "hidded" : "showed")+" at "+nowDateTime);
  }
}
