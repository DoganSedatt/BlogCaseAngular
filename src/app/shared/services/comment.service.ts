import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddComment } from '../models/AddComment';
import { Observable } from 'rxjs';
import { AddBlog } from '../models/AddBlog';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient:HttpClient) { }

  apiUrl: string = "http://localhost:60805/api/Comments";

  addComment(comment:AddComment):Observable<AddComment>{
    return this.httpClient.post<AddComment>(this.apiUrl,comment);
  }
}
