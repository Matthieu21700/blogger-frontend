import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './components/formulaire/post-form.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'add-post', component: PostFormComponent },
  {path: 'post',component:PostListComponent},
  {path:'',component: JobListComponent},
  {path:'login',component:LoginComponent}
    // Route pour le formulaire
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
