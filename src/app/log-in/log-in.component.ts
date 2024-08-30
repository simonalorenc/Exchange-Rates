import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User, UserToLogin } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { NavbarRoutingService } from '../routing/navbar-routing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  error: string = '';
  private loginSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private navbarRoutingService: NavbarRoutingService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  private initializeForm() {
    this.loginForm = this.fb.group({
      'e-mail': ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const user: UserToLogin = { 
        email: this.loginForm.get('e-mail')?.value, 
        password: this.loginForm.get('password')?.value 
      };

      this.loginSubscription = this.userService.loginUser(user).subscribe(
        (response) => {
          this.authService.setToken(response.token);
          this.authService.setUsername(response.user.firstname);
          this.loginForm.reset();
          this.navbarRoutingService.onClickCurrencies('login');
        },
        (err) => {
          if (
            err.error === 'Incorrect Password' ||
            err.error === `User doesn't exist.`
          ) {
            this.error = err.error;
          } else {
            this.error =
              'An unexpected error occurred. \nPlease try again later.';
          }
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
