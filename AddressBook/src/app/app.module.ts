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
import { ToastrComponent, ContactService, PostService } from './shared';
import { PostComponent } from './posts/post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './shared/service/auth.service';
import { TopnavComponent } from './layout/topnav/topnav.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    ContactListComponent,
    ContactFormComponent,
    ContactDetailComponent,
    ToastrComponent,
    LoginComponent,
    SignupComponent,
    TopnavComponent,
    HomeComponent,
    ProfileComponent,
    FooterComponent,
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
  providers: [ContactService,PostService, BsModalService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
