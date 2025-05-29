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

  const userEmail = localStorage.getItem('userEmail');
  console.log('bon', userEmail);

  if (userEmail !== null) {
    this.UserService.getIdByemail(userEmail).subscribe({
      next: (userId: string) => {
        console.log('ID utilisateur récupéré :', userId);
        localStorage.setItem('userId', userId); // ← si tu veux le réutiliser ailleurs plus tard

        // Redirection selon rôle
        if (this.role === 'RECRUITER') {
          this.router.navigate(['create-job']);
        } else {
          this.router.navigate(['']);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'ID utilisateur :', err);
        alert('Erreur lors de la récupération de l\'utilisateur.');
      }
    });
  } else {
    alert('Erreur : email utilisateur introuvable.');
  }
}
}
