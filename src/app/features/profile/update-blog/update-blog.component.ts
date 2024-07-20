import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../../shared/services/blogpost.service';
import { ActivatedRoute } from '@angular/router';
import { GetBlog } from '../../../shared/models/GetBlog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UpdateBlog } from '../../../shared/models/UpdateBlog';

@Component({
  selector: 'app-update-blog',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-blog.component.html',
  styleUrl: './update-blog.component.scss'
})
export class UpdateBlogComponent implements OnInit{
  constructor(public blogService:BlogpostService,
    private activeRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
    ){}

    blogInfo!: GetBlog;
    blogUpdateForm!: FormGroup;


  ngOnInit(): void {
    this.updateBlogForm();
    this.blogUpdateForm.patchValue({
      title: this.blogService.selectedBlog.title,//Sayfa açılır açılmaz seçilen blog'un bilgileri input alanına yerleşsin
      content:this.blogService.selectedBlog.content//Kullanıcı isterse değiştirsin
    })
  }

  updateBlogForm(){
    this.blogUpdateForm = this.formBuilder.group({
      id:[this.blogService.selectedBlog.id],
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
  blogUpdate(){
    if (this.blogUpdateForm.valid) {
      const blogUpdateFormValues:UpdateBlog=this.blogUpdateForm.value;
      this.blogService.updateBlog(blogUpdateFormValues).subscribe(
        {next:(response)=>{
          
          this.toastrService.success(response.title+" konulu blog başarıyla güncellendi")
        }
      },
    );
  }
}

  getBlogById(){
    let blogId = this.activeRoute.snapshot.paramMap.get('id');
    this.blogService.getById(blogId!).subscribe({
      next: (response:GetBlog)=>{
        this.blogInfo = response
        console.log("Response: ",this.blogInfo);
      },
    });}
  }
