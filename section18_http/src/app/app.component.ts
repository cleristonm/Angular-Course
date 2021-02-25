import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postService : PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content).subscribe( data =>{
      console.log(data);
      this.fetchPosts();
    });
    
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts(){
    this.isFetching = true
    this.postService.fetchPosts().subscribe( posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
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
