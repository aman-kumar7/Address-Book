import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ContactDetailComponent} from './contact-list/contact-detail';
import {ContactFormComponent} from './contact-list/contact-form';
import {ContactListComponent} from './contact-list';

const routes: Routes = [
  {    
    path:'',
    redirectTo:'contact',
    pathMatch:'full'    
  },  
  {   
    path:'contact',
    component:ContactListComponent,
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
