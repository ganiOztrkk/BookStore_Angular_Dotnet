import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { CategoryPipe } from './pipes/category.pipe';
import { CartAnimationDirective } from './directives/cart.animation.directive';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UnderMaintenanceComponent } from './under-maintenance/under-maintenance.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FooterComponent } from './layouts/footer/footer.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    HomeComponent,
    NavbarComponent,
    CategoryPipe,
    CartAnimationDirective,
    ShoppingCartComponent,
    LoginComponent,
    RegisterComponent,
    UnderMaintenanceComponent,
    OrderComponent,
    OrderDetailComponent,
    WelcomePageComponent,
    FooterComponent,
    AdminLoginComponent,
    ProductManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SweetAlert2Module,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
