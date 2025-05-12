import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import{ Post} from '../data/post'


@Injectable()
export class PostService{
    private postsUrl = 'http://localhost:8080/posts';

    constructor(private http : HttpClient){}
    //getPosts(): Observable<Post[]>{
     //   const posts = of(POSTS);
     //   return posts;
   // }
   getAll(): Observable<Post[]>{
    return this.http.get<Post[]>(this.postsUrl);
   }
   createPost(postData: any): Observable<any> {
    return this.http.post(this.postsUrl, postData);
  }

   
}