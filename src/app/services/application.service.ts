// src/app/services/application.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient) {}

  createApplication(application: any): Observable<any> {
    return this.http.post(this.apiUrl, application);
  }

  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getApplicationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteApplication(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  getApplicationsByUserId(userId: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  // Méthode modifiée pour parser les données JSON
  getApplicationsByJobId(jobId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/job/${jobId}`).pipe(
      map(applications => applications.map(app => ({
        ...app,
        skills: app.skills ? JSON.parse(app.skills) : [],
        workExperiences: app.workExperiences ? JSON.parse(app.workExperiences) : []
      })))
    );
  }

  // NOUVELLES MÉTHODES
  acceptApplication(applicationId: string, message: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${applicationId}/accept`, { message });
  }

  rejectApplication(applicationId: string, message: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${applicationId}/reject`, { message });
  }

  markNotificationAsRead(applicationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${applicationId}/mark-read`, {});
  }

  getUnreadNotifications(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications/${userId}`);
  }
}