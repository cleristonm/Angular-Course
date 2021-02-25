import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("The request is on its way");

    //Clone and modify some properties
    const modifiedRequest = request.clone ({ 
      headers: request.headers.append('Auth', 'asdfasd'),
      params: request.params.append('user', '212')
    });    
    return next.handle(modifiedRequest);
  }
}
