import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent, ContactFormComponent, ContactDetailComponent } from './contact-list';
import { ContactService } from './service';
import { ToastrComponent } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactFormComponent,
    ContactDetailComponent,
    ToastrComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      tapToDismiss: true,
      easing: 'ease-in',
      newestOnTop: true,
      positionClass: 'toast-top-right',
      toastComponent: ToastrComponent,
      iconClasses: {
          error: 'error',
          info: 'info',
          success: 'success',
          warning: 'warning',
      },
  }),
  ],
  providers: [ContactService, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
