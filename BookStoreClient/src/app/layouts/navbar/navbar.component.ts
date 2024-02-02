import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  

  constructor(
    private translate: TranslateService,
    public shopping: ShoppingCartService
    ) {
    translate.setDefaultLang("tr");
  }

  switchLanguage(language: string){
    this.translate.use(language);
  }
  
}