import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private JWT_TOKEN_KEY = 'JWTToken';
  private USERNAME_KEY = 'username';
  private jwtToken: string | null = null;
  private isLogged = new BehaviorSubject<boolean>(false);

  constructor() {
    this.jwtToken = this.getToken();
    if (this.jwtToken !== null) {
      this.isLogged.next(true);
    }
  }

  public setToken(value: string): void {
    localStorage.setItem(this.JWT_TOKEN_KEY, value);
    this.isLogged.next(true);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN_KEY);
  }

  public removeToken() {
    localStorage.removeItem(this.JWT_TOKEN_KEY);
    this.isLogged.next(false);
  }

  public setUsername(name: string): void {
    localStorage.setItem(this.USERNAME_KEY, name);
  }

  public getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  public removeUsername() {
    localStorage.removeItem(this.USERNAME_KEY);
  }

  public isLoggedObservable(): Observable<boolean> {
    return this.isLogged.asObservable();
  }
}
