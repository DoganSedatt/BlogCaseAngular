import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/AccesToken';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient,private authService:AuthService) { }
  apiUrl: string = "http://localhost:60805/api/Auth/Login";

  Login(email: string, password: string, authenticatorCode: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.apiUrl, {
      email: email,
      password: password,
      authenticatorCode: authenticatorCode
    })
    
  }

  LogOut(){
    this.authService.logout();
  }
  
}
