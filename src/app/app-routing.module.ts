import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './components/formulaire/post-form.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { LoginComponent } from './login/login.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { RegisterComponent } from './register/register.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { JobPostesComponent } from './job-postes/job-postes.component';
import { CandidaturesComponent } from './candidatures/candidatures.component';

const routes: Routes = [
  {path: 'add-post', component: PostFormComponent },
  {path: 'post',component:PostListComponent},
  {path:'',component: JobListComponent},
  {path:'login',component:LoginComponent},
  { path: 'create-job', component: JobCreateComponent },
  { path: 'edit-job/:id', component: JobEditComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'apply/:jobId', component: JobApplicationComponent},
  {path: 'annonces', component: JobPostesComponent},
  {path: 'candidature', component: CandidaturesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }