import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  user: User = { firstname: '', lastname: '', email: '', password: '' };

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.registerForm = this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'e-mail': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void {
    this.user.firstname = this.registerForm.get('firstname')?.value;
    this.user.lastname = this.registerForm.get('lastname')?.value;
    this.user.email = this.registerForm.get('e-mail')?.value;
    this.user.password = this.registerForm.get('password')?.value;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.userService.registerUser(this.user).subscribe(
        response => {
          console.log(response)
        }
      );
      this.registerForm.reset();
    } else {
      this.registerForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
}
