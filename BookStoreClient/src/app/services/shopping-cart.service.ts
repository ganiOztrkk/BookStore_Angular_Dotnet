import { Injectable } from '@angular/core';
import { ShoeModel } from '../models/shoe.model';
import { SwalService } from './swal.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  subtotal: number = 0;
  total: number = 0;
  shipping: number = 35;
  discount: number = 0;
  count: number = 0;
  shoppingCart: ShoeModel[] = [];
  
  constructor(
    private swal: SwalService,
    private translate: TranslateService,
    private http: HttpClient
  ) {
    if (localStorage.getItem("shoppingCart")) {
      const cart : string | null = localStorage.getItem("shoppingCart");
      if (cart !== null) {
        this.shoppingCart = JSON.parse(cart);
        this.count = this.shoppingCart.length;
      }
    }
  }

   //#region priceCalculation

   calculateShipping(chartCount: number){
    if (chartCount > 2) {
      this.shipping = 0;
    }
  }

  calculateDiscount(subtotal: number){
    if (subtotal > 5000) {
      this.discount = -0.10 * subtotal;
    }
  }

  calculateSubtotal(shoppingCart: ShoeModel[]){
    this.subtotal = 0;
    for(let item of shoppingCart){
      this.subtotal += item.price;
    }
  }

  calculateTotal(subtotal:number, shipping:number, discount:number){
    this.total = subtotal + shipping + discount;
  }

  calculateOrder(){
    this.calculateSubtotal(this.shoppingCart);
    this.calculateShipping(this.count);
    this.calculateDiscount(this.subtotal);
    this.calculateTotal(this.subtotal, this.shipping, this.discount);
  }

  //#endregion


  removeByIndex(index: number) {
    this.translate.get("suretodelete").subscribe((title: string) => {
        this.translate.get("yes").subscribe((yesBtn: string) => {
            this.translate.get("cancel").subscribe((cancelBtn: string) => {
                this.swal.callSwal(title, cancelBtn, yesBtn, () => {
                    this.shoppingCart.splice(index, 1);
                    localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
                    this.count = this.shoppingCart.length;
                    this.calculateOrder();
                });
            });
        });
    });
  }

  payment(){
    this.http
    .post("http://localhost:5110/api/ShoppingCarts/Payment", {shoes: this.shoppingCart})
    .subscribe(res => {
      //dolacak
    })

  }

    
  
}