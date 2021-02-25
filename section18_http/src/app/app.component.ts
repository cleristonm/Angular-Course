import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(
        'https://angular-course-section-18-default-rtdb.firebaseio.com/posts.json', 
        postData).subscribe( (responseData) => {
          console.log(responseData);
        });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts(){
    this.http.get(
      'https://angular-course-section-18-default-rtdb.firebaseio.com/posts.json'
    )
    .pipe( map( responsaData => {
      const postsArray = [];
      for (const key in responsaData) {
        if (responsaData.hasOwnProperty(key)){
          postsArray.push( { ...responsaData[key], id: key });
        }        
      }
      return postsArray;
    }))
    .subscribe( posts => {
      console.log(posts);
    });
  }

  onClearPosts() {
    // Send Http request
  }
}
