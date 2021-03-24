import { Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

export class AuthEffecs {
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START)
    );

    constructor(private actions$: Actions){}
}