import { Component, OnInit } from '@angular/core';
import { Category } from '../../data/category';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true, 
})
export class PostFormComponent implements OnInit {
  categories: Category[] = [];
  postForm: FormGroup;
  

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private postService: PostService  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      content: ['', [Validators.required, Validators.maxLength(2500)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }
  close(): void {
    console.log("Fermeture du formulaire");
  }
  get title() { return this.postForm.get('title')!; }
  get content() { return this.postForm.get('content')!; }

  submit(): void {
    if (this.postForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Please review your post',
        showConfirmButton: false,
        timer: 3000
      });return;
    } 
    const formValue = this.postForm.value;
    const payload = {
      title: formValue.title,
      content: formValue.content,
      categoryId: formValue.category 
    };
      this.postService.createPost(payload).subscribe({
        next: (response) => {
          console.log('Post ajouté avec succès !', response);
          this.postForm.reset(); 
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du post', error);
        }
      });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Post Submitted Successfully',
        showConfirmButton: false,
        timer: 3000
      }).then(() => {
        
        window.location.href = '/';  
      });
    }
  }
  
  

