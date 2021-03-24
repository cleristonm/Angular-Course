import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging.service';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { authReducer } from './auth/store/auth.reducer';
import * as fromApp  from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffecs } from './auth/store/auth.effects';

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
