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
  private username = new BehaviorSubject<string>('');
  private message = new BehaviorSubject<string>('');

  constructor() {
    this.jwtToken = this.getToken();
    if (this.jwtToken !== null) {
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

  public removeToken() {
    localStorage.removeItem(this.JWT_TOKEN_KEY);
    this.isLogged.next(false);
  }

  public setLoginMessage(): void {
    this.message.next('login');
    console.log("auth service login")
  }

  public setRegisterMessage(): void {
    this.message.next('register');
  }

  public messageAsObservable(): Observable<string> {
    return this.message.asObservable();
  }

  public getMessage(): string {
    return this.message.value;
  }

  public clearMessage(): void {
    this.message.next('');
  }

  public setUsername(name: string): void {
    localStorage.setItem(this.USERNAME_KEY, name);
    this.username.next(name);
  }

  public getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  public removeUsername() {
    localStorage.removeItem(this.USERNAME_KEY);
    this.username.next('');
  }

  public isLoggedObservable(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  public usernameObservable(): Observable<string> {
    return this.username.asObservable();
  }
}
