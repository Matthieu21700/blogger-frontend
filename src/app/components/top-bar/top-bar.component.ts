import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector :'app-top-bar',
    templateUrl:'./top-bar.component.html',
    styleUrl: './top-bar.component.css',
    standalone: false
})export class TopBarComponent{
     constructor(private router: Router) {}

  isConnected(): boolean {
    return localStorage.getItem('userRole') !== null;
  }

  getRoleLabel(): string {
    const role = localStorage.getItem('userRole');
    return role === 'RECRUITER' ? 'Recruteur' : 'Candidat';
  }

  logout(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}