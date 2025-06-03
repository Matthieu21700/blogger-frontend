import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';

@Component({
    selector :'app-top-bar',
    templateUrl:'./top-bar.component.html',
    styleUrl: './top-bar.component.css',
    standalone: false
})
export class TopBarComponent implements OnInit {
  unreadCount = 0;

  constructor(
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    if (this.isCandidat()) {
      this.loadUnreadNotifications();
      setInterval(() => {
        this.loadUnreadNotifications();
      }, 30000);
    }
  }

  loadUnreadNotifications(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.applicationService.getUnreadNotifications(userId).subscribe({
        next: (notifications) => {
          this.unreadCount = notifications.length;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des notifications :', err);
        }
      });
    }
  }

  isConnected(): boolean {
    return localStorage.getItem('userRole') !== null;
  }

  getRoleLabel(): string {
    const role = localStorage.getItem('userRole');
    return role === 'RECRUITER' ? 'Recruteur' : 'Candidat';
  }
  
  isRecruteur(): boolean {
    return localStorage.getItem('userRole') === 'RECRUITER';
  }
  
  isCandidat(): boolean {
    return localStorage.getItem('userRole') === 'JOB_SEEKER';
  }

  logout(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}