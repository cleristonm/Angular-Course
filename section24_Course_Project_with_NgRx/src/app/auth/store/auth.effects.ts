import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
    ///To create a new observable
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
    authSucess = this.actions$.pipe(
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

    constructor(
        private actions$: Actions,
        private http : HttpClient,
        private router: Router
        ){}
}