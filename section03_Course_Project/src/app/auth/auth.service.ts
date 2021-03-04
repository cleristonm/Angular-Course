import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

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
  user = new Subject<User>();
  
  constructor(private http : HttpClient) { }

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.myAuthKey, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError( this.handleError ), 
    tap( resData => {
      this.handleAuthentication(
        resData.email, 
        resData.localId,
        resData.idToken,
        +resData.expiresIn,
      )
    }
    ));

  }

  private handleAuthentication( email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 10000)
      const user = new User(
          email, 
          userId, 
          token, 
          expirationDate
      );
      this.user.next(user);
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.myAuthKey, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError( this.handleError ),
    tap( resData => {
      this.handleAuthentication(
        resData.email, 
        resData.localId,
        resData.idToken,
        +resData.expiresIn,
      )
    }
    ));
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
