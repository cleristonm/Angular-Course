import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
 
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipeSelected : boolean = false;
  subscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeSelected = this.route.snapshot.queryParams['id'];
    this.subscription = this.route.queryParams
      .subscribe(
        (params) => {
          console.log(params);
          console.log(params['id']);
          this.recipeSelected = params['id'];   
        }

      )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
