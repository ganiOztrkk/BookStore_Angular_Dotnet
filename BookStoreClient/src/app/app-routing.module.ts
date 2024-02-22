import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UnderMaintenanceComponent } from './under-maintenance/under-maintenance.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ProductEditComponent } from './admin/product-edit/product-edit.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutsComponent,
    children: [
      {
        path: "",
        component: WelcomePageComponent
      },
      {
        path: "shop",
        component: HomeComponent
      },
      {
        path:"login",
        component: LoginComponent
      },
      {
        path:"register",
        component: RegisterComponent
      },
      {
        path: "shopping-cart",
        component: ShoppingCartComponent
      },
      {
        path: "order",
        component: OrderComponent
      },
      {
        path: "order-detail",
        component: OrderDetailComponent
      },
      {
        path: "under-maintenance",
        component: UnderMaintenanceComponent
      }
    ]
  },
  {
    path: "admin-login",
    component: AdminLoginComponent
  },
  {
    path: "product-management",
    component: ProductManagementComponent
  },
  {
    path: "add-product",
    component: AddProductComponent
  },
  {
    path: "product-edit/:id",
    component: ProductEditComponent
  },
  {
    path: "order-management",
    component: OrderManagementComponent
  },
  {
    path: "order-management/:status",
    component: OrderManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }