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
  // src/app/services/job.service.ts
searchJobs(location: string, type: string, experienceLevel: string): Observable<Job[]> {
  const params = new HttpParams()
    .set('location', location)
    .set('type', type)
    .set('experienceLevel', experienceLevel);

  return this.http.get<Job[]>(`${this.apiUrl}/search`, { params });
}
createJob(job: any): Observable<any> {
  return this.http.post(`${this.apiUrl}`, job);
}



}
