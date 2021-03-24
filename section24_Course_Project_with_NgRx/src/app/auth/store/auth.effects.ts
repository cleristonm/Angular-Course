import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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
                    return of(new AuthActions.Login({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: expirationDate
                    }));
                }),
                catchError( error => {

                    ///To create a new observable
                    return of();
                }),                 
            );
        }),
        
        
    );

    constructor(
        private actions$: Actions,
        private http : HttpClient
        ){}
}