import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuSelected: string;

  changeMenu(menu: string){
    this.menuSelected=menu;
  }
}
