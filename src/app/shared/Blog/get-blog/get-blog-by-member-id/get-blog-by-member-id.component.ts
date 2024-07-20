import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { GetBlog } from '../../../models/GetBlog';
import { BlogpostService } from '../../../services/blogpost.service';
import { PaginationResponseModel } from '../../../models/PaginationResponseModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-blog-by-member-id',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-blog-by-member-id.component.html',
  styleUrl: './get-blog-by-member-id.component.scss'
})
export class GetBlogByMemberIdComponent implements OnInit{
  memberId!:string;
  blogs:GetBlog[]=[];
  constructor(private authService:AuthService,private blogService:BlogpostService){}

  ngOnInit(): void {
    if(this.authService.loggedInMember)
   this.memberId =this.authService.loggedInMember?.id;

    this.getBlogs();
  }



  getBlogs(){

    this.blogService.getAllBlogByMembers(this.memberId).subscribe(response=>{
      this.blogs=response.items.flat();
      console.log(response);
    })
  }
}
