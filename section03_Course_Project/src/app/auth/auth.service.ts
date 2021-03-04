import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.myAuthKey, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError( this.handleError ));

  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.myAuthKey, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError( this.handleError ));
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
