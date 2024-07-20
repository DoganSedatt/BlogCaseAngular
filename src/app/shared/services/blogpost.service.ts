import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlog } from '../models/AddBlog';
import { Response } from '../models/Response';
import { Member } from '../../core/models/Member';
import { PaginationResponseModel } from '../models/PaginationResponseModel';
import { GetBlog } from '../models/GetBlog';
import { UpdateBlog } from '../models/UpdateBlog';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private httpClient:HttpClient) { }
  apiUrl: string = "http://localhost:60805/api/BlogPosts";
  selectedBlog!:GetBlog;

  addBlog(Blog:AddBlog):Observable<AddBlog>{
    return this.httpClient.post<AddBlog>(this.apiUrl,Blog);
  }
  updateBlog(Blog:UpdateBlog):Observable<UpdateBlog>{
    return this.httpClient.put<UpdateBlog>(this.apiUrl,Blog);
  }
  removeBlog(id:string){
    return this.httpClient.delete(this.apiUrl+"/"+id);
  }
  getAll(): Observable<PaginationResponseModel<GetBlog>> {
    return this.httpClient.get<PaginationResponseModel<GetBlog>>(this.apiUrl+"?PageIndex=0&PageSize=10");
  }

  getById(id:string):Observable<GetBlog>{
    return this.httpClient.get<GetBlog>(this.apiUrl+'/'+id)
  }
  getAllBlogByMembers(memberId:string):Observable<PaginationResponseModel<GetBlog[]>>{
    const apiUrl = `http://localhost:60805/api/BlogPosts/member/${memberId}?PageIndex=0&PageSize=10`;
  return this.httpClient.get<PaginationResponseModel<GetBlog[]>>(apiUrl);
  }
}
