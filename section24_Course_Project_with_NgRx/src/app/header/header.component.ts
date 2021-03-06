import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSub: Subscription;

    
    @Output() menuChanged = new EventEmitter<string>();

    constructor(
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
        // this.dataStorageService.storeRecipes();        
        this.store.dispatch(new RecipesActions.StoreRecipes());
    }

    onFetchData(){
        //this.dataStorageService.fetchData().subscribe();
        this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    onLogout(){
        this.store.dispatch(new AuthActions.Logout());
    }

    
    
}