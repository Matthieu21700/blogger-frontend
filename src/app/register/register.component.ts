import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie !',
        text: 'Vous pouvez maintenant vous connecter.',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        console.log('bonou', data);
        localStorage.setItem('user_id', data.id); // UUID ici
        this.router.navigate(['/login']);
      });
    },
    error: (err) => {
      console.error('Erreur inscription :', err);

      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Erreur lors de l'inscription."
      });
    }
  });
}

}
