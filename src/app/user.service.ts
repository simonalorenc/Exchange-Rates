import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public registerUser(user: User): Observable<User> {
    console.log('user registered!')
    return this.http.post<User>(`${this.userServerUrl}/auth/register`, user);
  }
}
