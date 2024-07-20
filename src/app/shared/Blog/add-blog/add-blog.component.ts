import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { BlogpostService } from '../../services/blogpost.service';
import { AddBlog } from '../../models/AddBlog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss'
})
export class AddBlogComponent implements OnInit{
  blogPostForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService:AuthService,private blogService:BlogpostService
    ,private toast:ToastrService ) { }

  ngOnInit(): void {
    this.createBlogForm();
  }

  createBlogForm(){
    this.blogPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      memberId:[this.authService.loggedInMember?.id]
    });
  }
  onSubmit(): void {
    if (this.blogPostForm.valid) {
      const blogPostFormValues:AddBlog=this.blogPostForm.value;
      this.blogService.addBlog(blogPostFormValues).subscribe(
        {next:(response)=>{
          this.toast.success(response.title+" konulu blog başarıyla eklendi")
        }
      },
    );
    }
  }
}
