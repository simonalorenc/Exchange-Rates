import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserToLogin, RegisterUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public registerUser(user: User): Observable<RegisterUser> {
    return this.http.post<RegisterUser>(`${this.userServerUrl}/auth/register`, user);
  }

  public loginUser(user: UserToLogin): Observable<RegisterUser> {
    return this.http.post<RegisterUser>(`${this.userServerUrl}/auth/login`, user);
  }

  public getUserCurrencies(token: string): Observable<string[]> {
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<string[]>(`${this.userServerUrl}/getUserCurrencies`, { headers });
  }
 
  public addCurrency(currency: string, token: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const body = { currency };
    return this.http.post<string>(`${this.userServerUrl}/addCurrency`, body, { headers });
  }

  public deleteCurrency(currency: string, token: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    const body = { currency };
    return this.http.delete<string>(`${this.userServerUrl}/deleteCurrency`, { headers, body });
  }
}
