import {Component, OnInit} from "@angular/core";
import { PostService } from "../services/post.service";
import { Post } from "../data/post";

@Component({
    selector: 'app-post-list',
    templateUrl : './post-list.component.html',
    styleUrls : ['./post-list.component.css'],
    standalone:false
})
export class PostListComponent implements OnInit{
    posts : Post[]=[];
    constructor(private postService: PostService){}
    
    ngOnInit(): void {
        this.loadPosts();
    }

    loadPosts(): void{
        this.postService.getAll().subscribe(posts =>{
            this.posts=posts;
        })
    }
    

}