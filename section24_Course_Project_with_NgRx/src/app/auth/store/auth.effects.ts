import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 10000)
                    ///To create a new observable
                    return new AuthActions.Login({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: expirationDate
                    });
                }),
                catchError( errorRes => {
                    let errorMesage = 'An unknow error occured!';
                    if (!errorRes.error || !errorRes.error.error){
                        return of(new AuthActions.LoginFail(errorMesage));
                    }
                    switch (errorRes.error.error.message){
                        case 'EMAIL_EXISTS':
                            errorMesage =  'This email exists already!';
                        case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD' || 'USER_DISABLED':
                            errorMesage =  'Credentials are not valid or is disabled.';
                        }
                    return of(new AuthActions.LoginFail(errorMesage));
                }),                 
            );
        }),
        
        
    );

    @Effect({dispatch: false})
    authSucess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    constructor(
        private actions$: Actions,
        private http : HttpClient,
        private router: Router
        ){}
}