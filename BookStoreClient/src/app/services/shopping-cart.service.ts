import { Injectable } from '@angular/core';
import { ShoeModel } from '../models/shoe.model';
import { SwalService } from './swal.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PaymentModel } from '../models/payment.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './auth.service';
import { SetShoppingCartModel } from '../models/set-shopping-cart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  subtotal: number = 0;
  total: number = 0;
  shipping: number = 35;
  discount: number = 0;
  count: number = 0;
  shoppingCart: any[] = [];
  
  constructor(
    private swal: SwalService,
    private translate: TranslateService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {
    this.checkLocalStoreForShoppingCart();
  }

  checkLocalStoreForShoppingCart(){
    this.authService.isAuthenticated();
    if (localStorage.getItem("shoppingCart")) {
      const cart : string | null = localStorage.getItem("shoppingCart");
      if (cart !== null) {
        this.shoppingCart = JSON.parse(cart);
      }
    }else{
      this.shoppingCart = [];
      this.count = 0;
    }

    if (localStorage.getItem("accessToken")) {
      this.http
      .get<any[]>("https://localhost:7048/api/ShoppingCarts/GetUserCart/"+this.authService.userId)
      .subscribe( res => {
        this.shoppingCart = res;
        this.count = res.length;
        this.calculateOrder();
      })
    }
    
    this.calculateOrder();
  }

   //#region priceCalculation

   calculateShipping(chartCount: number){
    if (chartCount > 2) {
      this.shipping = 0;
    }else{
      this.shipping = 35;
    }
  }

  calculateDiscount(subtotal: number){
    if (subtotal > 5000) {
      this.discount = -0.10 * subtotal;
    }else {
      this.discount = 0;
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

  calculateCartLength(){
    if (this.shoppingCart.length === 0) {
      this.count = 0;
    }else{
      this.count = this.shoppingCart.length;
    }
  }

  calculateOrder(){
    this.calculateCartLength();
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

                  if (localStorage.getItem("accessToken")) {
                    this.http
                    .get("https://localhost:7048/api/ShoppingCarts/RemoveById/"+ this.shoppingCart[index]?.shoppingCartId)
                    .subscribe( res =>{
                      this.checkLocalStoreForShoppingCart();
                    })  
                  }else{
                    this.shoppingCart.splice(index, 1);
                    localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
                    this.count = this.shoppingCart.length;
                    this.calculateOrder();
                  }

                });
            });
        });
    });
  }

  addToCart(shoe: ShoeModel) {
    this.authService.isAuthenticated();

    if (localStorage.getItem("accessToken")) {
      const cartItem: SetShoppingCartModel = new SetShoppingCartModel();
      cartItem.userId = parseInt(this.authService.userId);
      cartItem.shoeId = shoe.id;
      cartItem.price = shoe.price;
      cartItem.size = 40;
      cartItem.quantity = 1;


      this.http.post("https://localhost:7048/api/ShoppingCarts/Add",cartItem).subscribe( res => {
        this.checkLocalStoreForShoppingCart();
        this.translate.get("addtobasketsuccess").subscribe(res => {
          this.swal.callToast(res, "success");
        })
      });

    }else{
      this.shoppingCart.push(shoe);
      localStorage.setItem('shoppingCart',JSON.stringify(this.shoppingCart));

      this.count++;
      this.translate.get("addtobasketsuccess").subscribe(res => {
        this.swal.callToast(res, "success");
      })
    }
  }


  payment(data: PaymentModel, callBack: (res: any) => void){
    this.spinner.show();
    this.http
    .post("https://localhost:7048/api/ShoppingCarts/Payment", data)
    .subscribe({
      next: (res) => {
        callBack(res);
        this.spinner.hide();
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
      }
    })
  }
}