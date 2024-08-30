import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User, UserToLogin, RegisterUser } from './user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) { }

  public registerUser(user: User): Observable<void> {
    return this.http.post<RegisterUser>(`${this.userServerUrl}/auth/register`, user).pipe(map(res => {
      this.authService.setToken(res.token);
      this.authService.setUsername(user.firstname);
      })
    );
  }

  public loginUser(user: UserToLogin): Observable<void> {
    return this.http.post<RegisterUser>(`${this.userServerUrl}/auth/login`, user).pipe(map(res => {
      this.authService.setToken(res.token);
      this.authService.setUsername(res.user.firstname);
    }))
  }

  public getUserCurrencies(): Observable<string[]> {
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<string[]>(`${this.userServerUrl}/getUserCurrencies`, { headers });
  }
 
  public addCurrency(currency: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const body = { currency };
    return this.http.post<string>(`${this.userServerUrl}/addCurrency`, body, { headers });
  }

  public deleteCurrency(currency: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    const body = { currency };
    return this.http.delete<string>(`${this.userServerUrl}/deleteCurrency`, { headers, body });
  }
}
