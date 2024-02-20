import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { RequestModel } from '../models/request.model';
import { ResponseModel } from '../models/response.model';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ErrorService } from '../services/error.service';
import { ShoeModel } from '../models/shoe.model';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {
  response: ResponseModel = new ResponseModel();
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();
  searchCategory: string = '';
  newShoes: ShoeModel[] = [];


  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "autoplay": true,
    "autoplaySpeed": 5000,
    "pauseOnHover": true,
    "infinite": true,
    "arrows": true,
    "responsive":[
      {
        "breakpoint": 990,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 3,
          "slidesToScroll": 3
        }
      },
      {
        "breakpoint": 768,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      }
    ]
  };


  constructor(
    private http: HttpClient, 
    public shopping: ShoppingCartService,
    private error: ErrorService
    ) {
      this.getNewest();
    }


    getNewest(){
      this.http.get("https://localhost:7048/api/Shoes/GetNewestShoes")
      .subscribe({
        next: (res: any) => {
          this.newShoes = res;
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
      })
    }

 
  
}