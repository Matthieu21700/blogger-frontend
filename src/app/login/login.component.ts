import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  login() {
    // Enregistrement "fake" des infos
    localStorage.setItem('userRole', this.role);
    localStorage.setItem('userEmail', this.email);

    // Redirection selon rôle
    if (this.role === 'RECRUITER') {
      this.router.navigate(['create-job']);
    } else {
      this.router.navigate(['']);
    }
  }
}
