import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/shared/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit{
  signUpForm!: FormGroup;

  

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    
  }

  ngOnInit(): void {
    this.initialisesignUpForm();
  }

  initialisesignUpForm(){
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'), this.mustMatch('password', 'confirmPassword')]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', Validators.required]
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }

  onSubmitSignUpForm() {
    if (this.signUpForm.valid) {
      console.log('Form Submitted!', this.signUpForm.value);
      this.apiService.addNewUser(this.signUpForm.value).subscribe(data => {
        if(data){
          
          console.log('Successfuly created user')
        }
      })
    }
  }
}
