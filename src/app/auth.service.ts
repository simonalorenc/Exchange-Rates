import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private JWT_TOKEN_KEY = 'JWTToken';
  private jwtToken: string | null = null;
  private isLogged = new BehaviorSubject<boolean>(false)

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
    return localStorage.getItem(this.JWT_TOKEN_KEY);
  }

  public removeToken() {
    localStorage.removeItem(this.JWT_TOKEN_KEY);
    this.isLogged.next(false);
  }

  public isLoggedObservable(): Observable<boolean> {
    return this.isLogged.asObservable();
  }
}
