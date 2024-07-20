import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/Register';
import { Observable } from 'rxjs';
import { AddBlog } from '../../shared/models/AddBlog';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient:HttpClient) { }

  apiUrl="http://localhost:60805/api/Members";

  register(registerMember:Register):Observable<Register>{
    return this.httpClient.post<Register>(this.apiUrl,registerMember);
  }
}
