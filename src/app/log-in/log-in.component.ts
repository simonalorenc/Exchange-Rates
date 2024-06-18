import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserToLogin } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  isUserLogged: boolean = false;
  loginForm!: FormGroup;
  user: UserToLogin = { email: '', password: '' };
  error: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
  this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = this.fb.group({
      'e-mail': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    })
  }

  onSubmit(): void {
    this.saveUserData();
    if (this.loginForm.valid) {
      this.userService.loginUser(this.user).subscribe(
        response => {
          this.authService.setToken(response);
          this.loginForm.reset();
        },
        err => {
          this.error = err.error;
        }
      )
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  private saveUserData() {
    this.user.email = this.loginForm.get('e-mail')?.value;
    this.user.password = this.loginForm.get('password')?.value;
  }
}
