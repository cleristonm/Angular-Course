import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error : string = null;
  @ViewChild(PlaceholderDirective, {static: false})  alertHost: PlaceholderDirective;

  private closeSubs : Subscription;

  constructor(private authService: AuthService,
      private router: Router,
      private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if (!form.valid){
      return; 
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode){
      authObs = this.authService.login(email,password)
    }else {
      authObs = this.authService.signup(email,password)
    }

    authObs.subscribe( respData => {
      console.log(respData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, 
    errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
      this.showErrorAlert(errorMessage);
    });

    
    form.reset();
    
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(){
    if (this.closeSubs){
      this.closeSubs.unsubscribe();
    }
  }

  private showErrorAlert(messsage: string){    
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();    
    const cmpRef = hostViewContainerRef.createComponent(alertCmpFactory);        
    cmpRef.instance.message = messsage;    
    this.closeSubs = cmpRef.instance.close.subscribe( () => {
      this.closeSubs.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
