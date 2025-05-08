import { Component, OnInit } from '@angular/core';
import { Category } from '../../data/category';
import { CategoryService } from '../../services/category.service';
import { PostCreateInput } from '../../data/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  standalone: false
})
export class PostFormComponent implements OnInit {
  categories: Category[] = [];
  post: PostCreateInput = {
    title: '',
    content: '',
    category: {  id:"", name: '' } // ou juste id si backend attend seulement l'id
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  submit(): void {
    // envoyer `this.post` via PostService à ton backend
  }
  
}
