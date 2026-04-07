import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/measurement.models';
import { LoginResponse, SignupResponse } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);

  private baseUrl = 'https://quantitymeasurementapp-production-c47a.up.railway.app/auth';

  login(data: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username); 
      })
    );
  }

  signup(data: User): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.baseUrl}/signup`, data);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);

      // 🔥 Check expiry
      const expiry = decoded.exp * 1000; // convert to ms

      if (Date.now() > expiry) {
        this.logout(); // auto logout
        return false;
      }

      return true;

    } catch (error) {
      console.error("Invalid token", error);
      this.logout();
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}