import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { Register } from '../models/Register';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,private registerService:RegisterService,private toastrService:ToastrService,private route:Router) {
    
  }
  ngOnInit(): void {
   this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerFormValue:Register=this.registerForm.value;
      this.registerService.register(registerFormValue).subscribe({
        next:(response)=>{
          console.log(response);
          this.toastrService.success(response.email+" başarıyla kayıt oldu");
          this.route.navigateByUrl('/login');
        }
      })
    }
  }
}