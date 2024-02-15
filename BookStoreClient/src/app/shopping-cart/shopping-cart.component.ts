import { Component } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { PaymentModel } from '../models/payment.model';
import { Cities } from '../constants/cities';
import { Months } from '../constants/months';
import { Years } from '../constants/years';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from '../services/swal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  selectedTab: number = 1;
  request: PaymentModel = new PaymentModel();
  cities: string[] = Cities;
  months: string[] = Months;
  years: string[] = Years;
  isSameAddress: boolean = false;
  cardNumber1: string = '5890';
  cardNumber2: string = '0400';
  cardNumber3: string = '0000';
  cardNumber4: string = '0016';

  constructor(
    public shopping: ShoppingCartService,
    private translate: TranslateService,
    private swal: SwalService,
    private authService: AuthService
    ) {
    shopping.calculateOrder();
    this.request.shoes = this.shopping.shoppingCart;
  }

  changeTab(tabNumber: number) {
    this.selectedTab = tabNumber;
  }

  payment() {
    this.request.paymentCard.cardNumber = this.cardNumber1+this.cardNumber2+this.cardNumber3+this.cardNumber4;
    this.request.buyer.city = this.request.shippingAddress.city;
    this.request.buyer.country = this.request.shippingAddress.country;
    this.request.buyer.registrationAddress = this.request.shippingAddress.description;
    this.request.userId = parseInt(this.authService.userId);

    this.shopping.payment(this.request, (res) => {
      const modalCloseBtn = document.getElementById("paymentModalCloseBtn");
      modalCloseBtn?.click();
      localStorage.removeItem("shoppingCart");
      this.shopping.shoppingCart = [];
      this.shopping.checkLocalStoreForShoppingCart();
      this.translate.get("successfulPayment").subscribe(traslatedMessage => {
        this.swal.callPaymentSwal(traslatedMessage);
      })
    });
  }

  changeIsSameAddress() {
    if (this.isSameAddress) {
      this.request.billingAddress = this.request.shippingAddress;
    }else{
      this.request.billingAddress = {...this.request.shippingAddress}
    }
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[0-9]/;
    const allowedSpecialKeys = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
    ];
    const key = event.key;

    if (!allowedChars.test(key) && !allowedSpecialKeys.includes(key)) {
      event.preventDefault();
    }
  }

}