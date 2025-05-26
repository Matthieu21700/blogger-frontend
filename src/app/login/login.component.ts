import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    email = '';
  password = '';
  role = 'JOB_SEEKER';

  constructor(private router: Router,private UserService: UserService ) {}

  login() {
    // Enregistrement "fake" des infos
    localStorage.setItem('userRole', this.role);
    localStorage.setItem('userEmail', this.email);
    const userEmail = localStorage.getItem('userEmail'); // ou 'userEmail' si tu fais le lien côté backend
    console.log('bon',userEmail);
    // Redirection selon rôle
    if (this.role === 'RECRUITER') {
      this.router.navigate(['create-job']);
    } else {
      this.router.navigate(['']);
    }
  }
}
