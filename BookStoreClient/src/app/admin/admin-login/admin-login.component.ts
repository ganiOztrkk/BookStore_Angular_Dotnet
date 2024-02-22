import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username: string = "admin";
  password: string = "admin";


  constructor(
    private http: HttpClient,
    private error: ErrorService,
    private adminAuth: AdminAuthService,
    private router: Router) {
    
  }

  login(username: string, password: string){
    this.http.post("https://localhost:7048/api/AdminAuth/Login",{username, password})
    .subscribe({
      next: (res: any) => {
        const token = res.accessToken;
        localStorage.setItem("adminToken", JSON.stringify(token));
        this.adminAuth.isAdminAuthenticated();
        this.router.navigateByUrl("/product-management");
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }
  
}