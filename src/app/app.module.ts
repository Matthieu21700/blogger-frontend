import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { provideHttpClient} from '@angular/common/http'
import { PostService } from './services/post.service';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { PostFormComponent } from './components/formulaire/post-form.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from './services/category.service';
import { FormsModule } from '@angular/forms';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobService } from './services/job.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PostListComponent,
    PostListItemComponent,
    JobListComponent,
    LoginComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    PostFormComponent,
    CommonModule,
   
    
  ],
  providers: [
    provideHttpClient(),
    PostService,
    CategoryService,
    JobService
  ],
  bootstrap: [AppComponent
  ]
})
export class AppModule { }
