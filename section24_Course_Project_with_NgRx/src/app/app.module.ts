import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreRouterConnectingModule } from '@ngrx/router-store'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging.service';
import * as fromApp  from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffecs } from './auth/store/auth.effects';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,                
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffecs]),
    AppRoutingModule,    
    ShoppingListModule,
    SharedModule,
    AuthModule,
    StoreDevtoolsModule.instrument({logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService,
      multi: true
    },
    LoggingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
