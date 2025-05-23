import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'JOB_SEEKER'
  };

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    this.userService.registerUser(this.user).subscribe({
      next: (data) => {
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        console.log('bonou',data)
        localStorage.setItem('user_id', data.id); // ⬅️ UUID ici
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur inscription :', err);
        
        alert("Erreur lors de l'inscription.");
      }
    });
  }
}
