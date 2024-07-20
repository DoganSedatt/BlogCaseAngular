import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../../core/models/Member';
import { Observable } from 'rxjs';
import { PaginationResponseModel } from '../models/PaginationResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient:HttpClient) { }

  apiUrl="http://localhost:60805/api/Members";


  getAll(): Observable<PaginationResponseModel<Member>> {
    return this.httpClient.get<PaginationResponseModel<Member>>(this.apiUrl+"?PageIndex=0&PageSize=10");
  }
}
