export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string; // "RECRUITER" ou "JOB_SEEKER"
}
