import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../models/Member';
import { ToastrService } from 'ngx-toastr';

function safeLocalStorage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'Bearer';
  private memberKey = 'loggedInMember';
  private isLoggedKey = 'isLogged';
  private loggedMember!: Member;
  public isLogged: boolean = false;

  constructor(private router: Router,private toastr:ToastrService) { 
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const storage = safeLocalStorage();
    if (storage) {
      const storedIsLogged = storage.getItem(this.isLoggedKey);
      this.isLogged = storedIsLogged ? JSON.parse(storedIsLogged) : false;

      if (this.isLogged) {
        const memberData = this.getMember();
        this.loggedMember = memberData ? JSON.parse(memberData) : null;
      }
    }
  }

  getToken(): string | null {
    const storage = safeLocalStorage();
    return storage ? storage.getItem(this.tokenKey) : null;
  }

  setToken(token: string): void {
    const storage = safeLocalStorage();
    if (storage) {
      storage.setItem(this.tokenKey, token);
      this.setTokenExpiryListener();
    }
  }

  setMember(member: Member): void {
    const storage = safeLocalStorage();
    if (storage) {
      this.loggedMember = member;
      storage.setItem(this.memberKey, JSON.stringify(member));
    }
  }

  getMember(): string | null {
    const storage = safeLocalStorage();
    return storage ? storage.getItem(this.memberKey) : null;
  }

  get loggedInMember(): Member | null {
    if (!this.loggedMember) {
      const memberData = this.getMember();
      this.loggedMember = memberData ? JSON.parse(memberData) : null;
    }
    return this.loggedMember;
  }

  setTokenExpiryListener(): void {
    const token = this.getToken();
    if (!token) return;

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expiresAt = new Date(tokenPayload.exp * 1000);

    const timeout = expiresAt.getTime() - Date.now();
    setTimeout(() => {
      this.logout();
    }, timeout);
  }

  logout(): void {
    const storage = safeLocalStorage();
    if (storage) {
      this.isLogged = false;
      storage.removeItem(this.tokenKey);
      storage.removeItem(this.memberKey);
      storage.removeItem(this.isLoggedKey);
      this.toastr.success("Çıkış Yapıldı")
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

  login(): void {
    const storage = safeLocalStorage();
    if (storage) {
      this.isLogged = true;
      storage.setItem(this.isLoggedKey, JSON.stringify(true));
    }
  }
}
