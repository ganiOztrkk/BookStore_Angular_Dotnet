import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  count: number = 0;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang("tr");
  }

  switchLanguage(language: string){
    this.translate.use(language);
  }
  
}

