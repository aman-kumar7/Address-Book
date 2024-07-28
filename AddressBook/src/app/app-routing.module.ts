import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ContactDetailComponent} from './contact-list/contact-detail';
import {ContactFormComponent} from './contact-list/contact-form';
import {ContactListComponent} from './contact-list';
import { PostComponent } from './posts/post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { canActivateGuard } from './shared/service/authGuard';

const routes: Routes = [
  {    
    path:'',
    redirectTo:'home',
    pathMatch:'full'    
  },  
  {
    path:'home',
    component: HomeComponent,
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'signup',
    component: SignupComponent,
  },
  {   
    path:'contact',
    component:ContactListComponent,
    canActivate: [canActivateGuard],
    children:[
      {   
        path:'detail/:id',
        component:ContactDetailComponent,
      },  
      {    
        path:'contact-form/:id',
        component:ContactFormComponent,        
      },
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
