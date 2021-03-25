import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //https://stackoverflow.com/questions/43348463/what-is-the-difference-between-subject-and-behaviorsubject
  // user = new BehaviorSubject<User>(null);
  
  private tokenExpirationTimer: any;

  constructor(private http : HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  

  private handleAuthentication( email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 10000)
      const user = new User(
          email, 
          userId, 
          token, 
          expirationDate
      );
      //this.user.next(user);
      this.store.dispatch( new AuthActions.AuthenticateSuccess({
        email,
        userId,
        token,
        expirationDate
      }));
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
  }


  logout(){
    this.store.dispatch( new AuthActions.Logout());    
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  
  private handleError(errorRes: HttpErrorResponse){
    let errorMesage = 'An unknow error occured!';
      if (!errorRes.error || !errorRes.error.error){
        return throwError(errorMesage);
      }
      switch (errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMesage =  'This email exists already!';
        case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD' || 'USER_DISABLED':
          errorMesage =  'Credentials are not valid or is disabled.';
      }
      return throwError(errorMesage);

  }
}
