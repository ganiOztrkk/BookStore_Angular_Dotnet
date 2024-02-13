import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from '../models/login.model';
import { Router } from '@angular/router';
import { SwalService } from '../services/swal.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { AuthService } from '../services/auth.service';
import { SetShoppingCartModel } from '../models/set-shopping-cart.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usernameOrEmail: string = "ganioztrk";
  password: string = "123";
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
        this.authService.isAuthenticated();

        const cartItems: SetShoppingCartModel[] = [];

        if (this.shoppingCart.count > 0) {
          for(let x of this.shoppingCart.shoppingCart){
            const cartItem = new SetShoppingCartModel();
            cartItem.userId = parseInt(this.authService.userId);
            cartItem.size = 40;
            cartItem.quantity = 1
            cartItem.shoeId = x.id;
            cartItem.price = x.price;
            cartItem.imageUrl = x.imageUrl;
            cartItem.description = x.description;
            cartItem.title = x.title;
            cartItems.push(cartItem)
          }

          this.http.post("https://localhost:7048/api/ShoppingCarts/SetShoppingCartFromLocalStorage", cartItems).subscribe( res => {
            localStorage.removeItem("shoppingCart");
            this.shoppingCart.checkLocalStoreForShoppingCart();
          });
        }else{
          this.shoppingCart.checkLocalStoreForShoppingCart();
        }


        this.router.navigateByUrl("");
        this.swal.callToast(res.message, "success")
      })
    }
  }
}