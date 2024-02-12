import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from '../models/login.model';
import { Router } from '@angular/router';
import { SwalService } from '../services/swal.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { SetShoppingCartModel } from '../models/set-shopping-cart.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usernameOrEmail: string = "";
  password: string = "";
  loginRequest: LoginModel = new LoginModel();

  constructor(
    private http: HttpClient,
    private router: Router,
    private swal: SwalService,
    private shoppingCart: ShoppingCartService,
    private authService: AuthService
    )
  {
    
  }

  login(form: NgForm){
    this.loginRequest.usernameOrEmail = this.usernameOrEmail;
    this.loginRequest.password = this.password;
    if (form.valid) {
      this.http.post("https://localhost:7048/api/Auth/Login", this.loginRequest)
      .subscribe((res: any) => {
        localStorage.setItem("accessToken", JSON.stringify(res.accessToken));
        this.router.navigateByUrl("");
        this.swal.callToast(res.message, "success")
      })
    }
  }
}