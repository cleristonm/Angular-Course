import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  
  createAndStorePost(title: string, content: string){

    const postData : Post = { title: title, content: content};
    this.http.post< {name: string} >(
      'https://angular-course-section-18-default-rtdb.firebaseio.com/posts.json', 
      postData).subscribe( (responseData) => {
        console.log(responseData);
      });
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
}
