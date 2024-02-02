import { Injectable } from '@angular/core';
import { ShoeModel } from '../models/shoe.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  count: number = 0;
  shoppingCart: ShoeModel[] = [];
  
  constructor() {
    if (localStorage.getItem("shoppingCart")) {
      const cart : string | null = localStorage.getItem("shoppingCart");
      if (cart !== null) {
        this.shoppingCart = JSON.parse(cart);
        this.count = this.shoppingCart.length;
      }
    }
  }
}