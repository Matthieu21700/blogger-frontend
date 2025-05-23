import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import{ Post} from '../data/post'
import { Category } from "../data/category";


@Injectable()
export class CategoryService{
    private categoryUrl = 'http://localhost:1234/categories';
    constructor(private http : HttpClient){}
    //getPosts(): Observable<Post[]>{
     //   const posts = of(POSTS);
     //   return posts;
   // }
   getAll(): Observable<Category[]>{
    return this.http.get<Category[]>(this.categoryUrl);
   }
   
}