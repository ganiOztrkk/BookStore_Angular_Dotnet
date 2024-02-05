import { Component } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { PaymentModel } from '../models/payment.model';
import { Cities } from '../constants/cities';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  
  selectedTab: number = 1;
  request: PaymentModel = new PaymentModel();
  cities: string[] = Cities;

  constructor(
    public shopping: ShoppingCartService
  ) 
  {
    shopping.calculateOrder();
    this.request.shoes = shopping.shoppingCart;
  }

  changeTab(tabNumber: number){
    this.selectedTab = tabNumber;
  }

  payment(){

  }
}