import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { BlogpostService } from '../../../shared/services/blogpost.service';
import { GetBlog } from '../../../shared/models/GetBlog';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { title } from 'process';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent implements OnInit{
  constructor(private authService:AuthService,private blogService:BlogpostService,private route:Router,private toastrService:ToastrService){}
  blogs:GetBlog[]=[];
  memberId!:string;

  ngOnInit(): void {
   this.getMemberDetails();
   if(this.authService.loggedInMember){
    this.memberId=this.authService.loggedInMember.id;
   }
   this.getBlogByMember();
  }

  getMemberDetails(){
    if(this.authService.loggedInMember)
    console.log(this.authService.loggedInMember);
    else{
      console.log("Kullanıcı Yok")
    }
  }

  getBlogByMember(){
    this.blogService.getAllBlogByMembers(this.memberId).subscribe(response=>{
      this.blogs=response.items.flat();
    })
  }

  selectedBlog(blog:GetBlog){
    this.blogService.selectedBlog=blog;
    this.route.navigate(['updateBlog/',blog.id]);
    console.log(blog);
    }
    deleteBlog(event:any,id:string){
      if(confirm('Bu kitabı silmek istiyor musunuz ?')){
        event.target.innerText="Siliniyor...";

      this.blogService.removeBlog(id).subscribe(response=>{
        this.toastrService.success("Blog silindi");
        this.getBlogByMember();
      })
    }
}
}