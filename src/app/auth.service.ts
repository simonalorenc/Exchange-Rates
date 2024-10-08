import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private JWT_TOKEN_KEY = 'JWTToken';
  private USERNAME_KEY = 'username';

  private isLogged = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string>('');

  constructor() {
    if (this.getToken() !== null) {
      this.isLogged.next(true);
    }
    const storedUsername = this.getUsername();
    if (storedUsername) {
      this.username.next(storedUsername);
    }
  }

  public setToken(value: string): void {
    localStorage.setItem(this.JWT_TOKEN_KEY, value);
    this.isLogged.next(true);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN_KEY);
  }

  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN_KEY);
    this.isLogged.next(false);
  }

  public setUsername(name: string): void {
    localStorage.setItem(this.USERNAME_KEY, name);
    this.username.next(name);
  }

  public getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  private removeUsername() {
    localStorage.removeItem(this.USERNAME_KEY);
    this.username.next('');
  }

  public isLoggedObservable(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  public usernameObservable(): Observable<string> {
    return this.username.asObservable();
  }

  public logoutUser(): void {
    this.removeToken();
    this.removeUsername();
  }
}
