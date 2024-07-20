import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogpostService } from '../../../services/blogpost.service';
import { GetBlog } from '../../../models/GetBlog';
import { Response } from '../../../models/Response';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // FormsModule ve CommonModule gerekli değil
import { AuthService } from '../../../../core/services/auth.service';
import { AddComment } from '../../../models/AddComment';
import { CommentService } from '../../../services/comment.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-read-blog',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './read-blog.component.html',
  styleUrls: ['./read-blog.component.scss'] 
})
export class ReadBlogComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    public blogService: BlogpostService,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private commentService: CommentService,
    private toastrService:ToastrService
  ) {}

  blogId: string | null = null; // blogId nullable olarak tanımlanmalı
  blogInfo!: GetBlog;
  showCommentForm:boolean=false;
  commentForm!: FormGroup;

  ngOnInit(): void {
    this.createCommentForm();
    this.getBlogById(); 
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      commenter: [this.authService.loggedInMember?.firstName, Validators.required],
      content: ['', Validators.required],
      blogpostId: [this.blogService.selectedBlog.id],
      memberId: [this.authService.loggedInMember?.id]
    });
  }

  submitCommentForm() {
    if (this.commentForm.valid) {
      const commentFormValue: AddComment = this.commentForm.value;
      this.commentService.addComment(commentFormValue).subscribe({
        next: (response) => {
          this.toastrService.success(response.content + " yorumu başarıyla eklendi");
          console.log(commentFormValue);
          this.commentForm.reset();
          this.showCommentForm=false;
        },
        error: (error) => {
          this.toastrService.error('Yorum ekleme hatası:', error);
         
        }
      });
    } else {
      this.toastrService.info('Form geçersiz. Lütfen gerekli alanları doldurun.');
      
    }
  }
  toogleCommentForm(){
    this.showCommentForm=!this.showCommentForm;
  }

  getBlogById() {
    this.blogId = this.activeRoute.snapshot.paramMap.get('id');
    this.blogService.getById(this.blogId!).subscribe({
      next: (response:GetBlog)=>{
        this.blogInfo = response
        console.log("Response: ",this.blogInfo);
      },
    });}


}
