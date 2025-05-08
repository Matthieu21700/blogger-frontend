import { Component, OnInit } from '@angular/core';
import { Category } from '../../data/category';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';  // Importez FormGroup et FormBuilder
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true, // IMPORTANT
})
export class PostFormComponent implements OnInit {
  categories: Category[] = [];
  postForm: FormGroup;
  

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {
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
      // Si le formulaire est invalide, afficher un toast d'erreur
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Please review your post',
        showConfirmButton: false,
        timer: 3000
      });
    } else {
      // Si le formulaire est valide, afficher un toast de succès et rediriger
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Post Submitted Successfully',
        showConfirmButton: false,
        timer: 3000
      }).then(() => {
        // Rediriger vers la page d'accueil ou autre page (ajustez l'URL)
        window.location.href = '/';  // ou utilisez le routeur Angular pour une navigation propre
      });
    }
  }
  
  
}
