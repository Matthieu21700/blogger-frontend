import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../data/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/jobs';
  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }
  
  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }
  
  searchJobs(
    location: string,
    type: string,
    experienceLevel: string,
    companyName: string,
    description:string,
    salaryMin: number | null,
    salaryMax: number | null
  ): Observable<Job[]> {
    let params = new HttpParams();
    if (location) params = params.set('location', location);
    if (type) params = params.set('type', type);
    if (description) params = params.set('description', description);
    if (experienceLevel) params = params.set('experienceLevel', experienceLevel);
    if (companyName) params = params.set('companyName', companyName);
    if (salaryMin !== null) params = params.set('salaryMin', salaryMin.toString());
    if (salaryMax !== null) params = params.set('salaryMax', salaryMax.toString());

    return this.http.get<Job[]>(`${this.apiUrl}/search`, { params });
  }

  createJob(job: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, job);
  }
  
  getJobsByUserId(userId: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/user/${userId}`);
  }

  // NOUVELLES MÉTHODES
  updateJob(jobId: string, job: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${jobId}`, job);
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${jobId}`);
  }

  canUserEditJob(jobId: string, userId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${jobId}/can-edit/${userId}`);
  }
}