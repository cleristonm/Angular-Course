import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer'
import { Store } from '@ngrx/store';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSub: Subscription;

    
    @Output() menuChanged = new EventEmitter<string>();

    constructor(private dataStorageService : DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>){}

    ngOnInit(){
        this.userSub = this.store.select('auth').subscribe(
            authState => {
                const user = authState.user;
                this.isAuthenticated = !!user;
                console.log(!user);
                console.log(!!user);
            }
        );
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

    onSaveData(){
        this.dataStorageService.storeRecipes();        
    }

    onFetchData(){
        this.dataStorageService.fetchData().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    
    
}