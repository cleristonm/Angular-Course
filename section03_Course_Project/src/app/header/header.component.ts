import { Component, Input, Output, EventEmitter } from '@angular/core'
import { environment } from 'src/environments/environment';
import { DataStorageService } from '../shared/data-storage.service';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    
    @Output() menuChanged = new EventEmitter<string>();

    constructor(private dataStorageService : DataStorageService){}

    onSaveData(){
        this.dataStorageService.storeRecipes();
        console.log(environment.mykey);
    }

    onFetchData(){
        this.dataStorageService.fetchData().subscribe();
    }

    
    
}