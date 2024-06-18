import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserToLogin } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public registerUser(user: User): Observable<string> {
    return this.http.post<string>(`${this.userServerUrl}/auth/register`, user);
  }

  public loginUser(user: UserToLogin): Observable<string> {
    return this.http.post<string>(`${this.userServerUrl}/auth/login`, user);
  }
}
