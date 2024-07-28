import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/service/auth.service';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.initialiseLoginForm();
    this.getusers();
  }

  initialiseLoginForm(){
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email],),
      password: new FormControl(''),
      //Custom Validator Function: checkPasswordStrength is a standalone function that follows Angular's validator function signature, returning ValidationErrors | null.
    });
  }

  checkpasswordstrength(control: AbstractControl){ //AbstractControl is a base class in Angular's reactive forms module that represents a form control, form group, or form array. It provides common functionality for all form controls, groups, and arrays, making it a fundamental building block in Angular’s form handling system.
    return null;
  }

  // isEmailAlreadyExist(control: AbstractControl) {
  //   const emailValue: string = control.value;

  //   return this.authService.checkIsEmailExists(emailValue)
  //   return null;
  // }

  // checkIsEmailValid(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     return this.authService.verifyEmail(control.value).pipe(
  //       map((response: any) => {
  //         const isDeliverable = response.deliverability === 'DELIVERABLE';
  //         const isValidFormat = response.is_valid_format.value;
  //         return isDeliverable && isValidFormat ? null : { deliverable: true };
  //       }),
  //       catchError(() => of({ email: true }))
  //     );
  //   };
  // }

  onSubmitLoginForm(): void {
    if(this.loginForm.valid){
      this.authService.loginUser(this.loginForm.value).subscribe(data => {
        if (data.isAuthenticated) {
          sessionStorage.setItem("userData", JSON.stringify(data));
          // Navigate to another page or perform post-login actions
          this.router.navigate(['./contact'])
          console.log('Login successful');
        } else {
          sessionStorage.removeItem("userData");
          //this.loginError = true;
          console.log('Login failed');
        }
      });
    }
  }

  getusers(){
    this.authService.getusers().subscribe(isAuthenticated => {
        console.log(isAuthenticated, 'Login failed');
    });
  }
}
