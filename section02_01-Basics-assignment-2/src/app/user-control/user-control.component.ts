import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css']
})
export class UserControlComponent implements OnInit {

  userName = "root"

  constructor() { }

  ngOnInit(): void {
  }

  resetUserName(){
    this.userName = '';
  }
}
