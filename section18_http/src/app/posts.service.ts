import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();  

  constructor(private http: HttpClient) { }

  
  createAndStorePost(title: string, content: string){

    const postData : Post = { title: title, content: content};
    return this.http.post< {name: string} >(
      'https://angular-course-section-18-default-rtdb.firebaseio.com/posts.json', 
      postData).
      subscribe( 
        () => {
          return postData;
        },
        error => {
          this.error.next(error.message);
        } );
  }

  fetchPosts(){
    // another way to do this is using a subject (when there are more components using this service)
    
    return this.http.get< {[key: string]: Post } >(
      'https://angular-course-section-18-default-rtdb.firebaseio.com/posts.json'
    )
    .pipe( map( responseData  => {
      const postsArray : Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)){
          postsArray.push( { ...responseData[key], id: key });
        }        
      }
      return postsArray;
    }));
  }

  deletePosts(){
    return this.http.delete(
      'https://angular-course-section-18-default-rtdb.firebaseio.com/posts.json'
    );
  }
}
