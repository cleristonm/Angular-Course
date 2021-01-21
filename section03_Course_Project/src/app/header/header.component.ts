import { Component, Input, Output, EventEmitter } from '@angular/core'


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    @Input() menuSelected: string;
    @Output() menuChanged = new EventEmitter<string>();

    menuClick(menu: string){
        this.menuChanged.emit(menu);
    }
    
}