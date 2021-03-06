import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Clone and modify some properties
    const modifiedRequest = request.clone ({ 
      headers: request.headers.append('Auth', 'asdfasd'),
      params: request.params.append('user', '212')
    });    
    return next.handle(modifiedRequest);
  }
}
