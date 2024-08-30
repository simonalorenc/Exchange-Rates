import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { NavbarRoutingService } from '../routing/navbar-routing.service';
import { FavouritesRatesService } from '../favourites-rates.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  user: User = { firstname: '', lastname: '', email: '', password: '', currencies: [] };
  error: string = '';
  
  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService, private navbarRoutingService: NavbarRoutingService, private favouritesRatesService: FavouritesRatesService) {}

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

  public onSubmit(): void {
    this.saveUserData();
    if (this.registerForm.valid) {
      this.userService.registerUser(this.user).subscribe(
        response => {
          this.authService.setToken(response.token);
          this.authService.setUsername(response.user.firstname);
          this.favouritesRatesService.initializeFavouritesAfterRegister();
          this.registerForm.reset();
          this.navbarRoutingService.onClickCurrencies('register');
        },
        err => {
          if (err.status === 0) {
            this.error = 'An unexpected error occurred. Please try again later.'
          } else {
            this.error = err.error;
          }
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  private saveUserData() {
    this.user.firstname = this.registerForm.get('firstname')?.value;
    this.user.lastname = this.registerForm.get('lastname')?.value;
    this.user.email = this.registerForm.get('e-mail')?.value;
    this.user.password = this.registerForm.get('password')?.value;
  }
}
