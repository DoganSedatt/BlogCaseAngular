import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { BlogpostService } from '../../shared/services/blogpost.service';
import { GetBlog } from '../../shared/models/GetBlog';
import { HttpClient } from '@angular/common/http';
import { PaginationResponseModel } from '../../shared/models/PaginationResponseModel';
import { MemberService } from '../../shared/services/member.service';
import { Member } from '../../core/models/Member';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{
  Blogs!:GetBlog[];
  Members!:Member[];
  memberId:string="";

  constructor(public authService:AuthService,
    private blogService:BlogpostService,
    private route:Router,
    private memberService:MemberService,
    private toastrService:ToastrService
    ){}

  ngOnInit(): void {
   this.getAllBlogs();
   this.getAllMembers();
  }
  
  getAllBlogs(){
    if(this.memberId){
      this.blogService.getAllBlogByMembers(this.memberId).subscribe({next:response=>{
        this.Blogs=response.items.flat()
        this.toastrService.success("Bloglar yazara göre listelendi");
      },
      error:err=>{
        this.toastrService.error(err+": yazara göre bloglar listelenirken hata meydana geldi");
      },
      complete:()=>{
       
      }
    })}
    else{
      this.blogService.getAll().subscribe({next:response=>{
        this.Blogs=response.items.flat();
        
      },
      error:err=>{
        this.toastrService.error(err+" :Bloglar listelenirken hata meydana geldi");
      },
      complete:()=>{
        
      }
      })
    } 
  }
  onMemberIdChange(event: any) {
    this.memberId = event.target.value;
    this.getAllBlogs();
  }
  
  getAllMembers(){
    this.memberService.getAll().subscribe(response=>{
      this.Members=response.items;
      console.log(this.Members);
    })
  }
  selectedBlog(blog:GetBlog){
  this.blogService.selectedBlog=blog;
  this.route.navigate(['read/',blog.id]);
  
  }
}