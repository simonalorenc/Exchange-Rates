import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private JWT_TOKEN_KEY = 'JWTToken';
  private jwtToken: string | null = null;
  private email: string = '';
  private isLogged = new BehaviorSubject<boolean>(false);

  constructor() {
    this.jwtToken = this.getToken();
    if (this.jwtToken !== null) {
      this.isLogged.next(true);
    }
  }

  public setToken(value: string): void {
    localStorage.setItem(this.JWT_TOKEN_KEY, JSON.stringify(value));
    this.isLogged.next(true);
  }

  public getToken(): string | null {
    const tokenString = localStorage.getItem(this.JWT_TOKEN_KEY);
    if (tokenString) {
      const tokenObject = JSON.parse(tokenString);
      return tokenObject.token || null;
    }
    return null;
  }

  public removeToken() {
    localStorage.removeItem(this.JWT_TOKEN_KEY);
    this.isLogged.next(false);
  }

  public setEmail(email: string): string {
    this.email = email;
    return this.email;
  }

  public getEmail(): string {
    return this.email;
  }

  public isLoggedObservable(): Observable<boolean> {
    return this.isLogged.asObservable();
  }
}
