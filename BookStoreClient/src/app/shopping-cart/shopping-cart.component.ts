import { Component } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoeModel } from '../models/shoe.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  subtotal: number = 0;
  total: number = 0;
  shipping: number = 35;
  discount: number = 0;

  constructor(
    public shopping: ShoppingCartService
  ) 
  {
     this.calculateOrder();
  }

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
    for(let item of shoppingCart){
      this.subtotal += item.price;
    }
  }

  calculateTotal(subtotal:number, shipping:number, discount:number){
    this.total = subtotal + shipping + discount;
  }

  async calculateOrder(){
    this.calculateSubtotal(this.shopping.shoppingCart);
    this.calculateShipping(this.shopping.count);
    this.calculateDiscount(this.subtotal);
    this.calculateTotal(this.subtotal, this.shipping, this.discount);
  }
  
}