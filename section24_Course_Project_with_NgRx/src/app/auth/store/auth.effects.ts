import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    localId: string;
    expiresIn: string;
    registered?: boolean;
  }


const handleAuthentication = (
    expiresIn: number,
    email: string,
    userId: string,
    token: string
) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 10000)
    
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate
    });
}

const handleError = (errorRes) => {
    let errorMesage = 'An unknow error occured!';
    if (!errorRes.error || !errorRes.error.error){
        return of(new AuthActions.AuthenticateFail(errorMesage));
    }
    switch (errorRes.error.error.message){
        case 'EMAIL_EXISTS':
            errorMesage =  'This email exists already!';
        case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD' || 'USER_DISABLED':
            errorMesage =  'Credentials are not valid or is disabled.';
        }
    return of(new AuthActions.AuthenticateFail(errorMesage));
    
};


@Injectable()
export class AuthEffecs {

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.
                post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.myAuthKey, 
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe( 
                tap( resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000)
                }),
                map( resData => {

                    return handleAuthentication(
                        +resData.expiresIn,
                        resData.email,
                        resData.localId,
                        resData.idToken
                    )
                    
                }),
                catchError( errorRes => {
                    return handleError(errorRes);
                    
                }),                 
            );
        }),
        
        
    );

    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap( (signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.myAuthKey, {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true
            })
            .pipe( 
                tap( resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn)
                }),
                map( resData => {
                    return handleAuthentication(
                        +resData.expiresIn,
                        resData.email,
                        resData.localId,
                        resData.idToken
                    )                    
                }),
                catchError( errorRes => {
                    return handleError(errorRes);                    
                }),                 
            );      
        })
    )

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData : {
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string
              } = JSON.parse(localStorage.getItem('userData'));
              if (!userData){
                return;
              }
              const loadedUser = new User(
                userData.email, 
                userData.id, 
                userData._token, 
                new Date(userData._tokenExpirationDate));
          
              if (loadedUser.token){      
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

                this.authService.setLogoutTimer(expirationDuration);
                return new AuthActions.AuthenticateSuccess({
                  email: loadedUser.email,
                  userId: loadedUser.id,
                  token: loadedUser.token,
                  expirationDate: new Date(userData._tokenExpirationDate)
                });
          
                // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                // this.autoLogout(expirationDuration);
              }
              return { type: ''};
        })
    )

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), 
    tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }))

    constructor(
        private actions$: Actions,
        private http : HttpClient,
        private router: Router,
        private authService: AuthService
        ){}
}