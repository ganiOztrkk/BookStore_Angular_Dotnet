import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(
    private translate: TranslateService,
    public shopping: ShoppingCartService,
    public authService: AuthService,
    private router: Router,
    private swal: SwalService
    ) {
    translate.setDefaultLang("tr");
    authService.isAuthenticated();
  }

  

  switchLanguage(language: string){
    this.translate.use(language);
  }

  logout(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("shoppingCart");
    this.shopping.checkLocalStoreForShoppingCart();
    this.router.navigateByUrl("");
    this.swal.callToast("Çıkış Yapıldı", "info");
    this.authService.isAuthenticated();
    this.authService.userId = "";
  }
  

}