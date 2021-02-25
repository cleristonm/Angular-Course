import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postService : PostsService) {}

  ngOnInit() {
    this.fetchPosts();
    this.errorSub = this.postService.error.subscribe( errorMessage => {
      this.error = errorMessage;
    })
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts(){
    this.isFetching = true
    this.postService.fetchPosts().subscribe( posts => {
      this.error = null;
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
    });
  }

  onClearPosts() {
    this.isFetching = true;
    this.postService.deletePosts().subscribe( () => {
      this.isFetching =false;
      this.loadedPosts = [];
    })
  }
}
