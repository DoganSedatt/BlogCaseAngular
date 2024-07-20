import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { LoginResponse } from '../models/AccesToken';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    public authService: AuthService,
    private toastrService:ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      authenticatorCode: ['']
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email ?? '';
      const password = this.loginForm.value.password ?? '';
      const authenticatorCode = this.loginForm.value.authenticatorCode ?? '';
  
      this.loginService.Login(email, password, authenticatorCode).subscribe({
        next: (result: LoginResponse) => {
          this.authService.login();
          this.authService.setToken(result.loggedResponse.accessToken.token);
          this.authService.setMember(result.memberInfo);
          this.toastrService.success('Başarılı bir şekilde giriş yaptınız.');
          console.log(this.authService.loggedInMember);
          this.router.navigateByUrl('/homepage');
        },
        error: (error) => {
          
          console.error('Giriş Hatası', error);
          this.toastrService.error('Giriş başarısız. Lütfen bilgilerinizi kontrol ediniz.');
        },
        complete: () => {
         
          console.log('İşlem Tamamlandı');
        }
      });
    } else {
      this.toastrService.info('Lütfen formu doğru doldurduğunuzdan emin olun.');
    }
  }
  
}
