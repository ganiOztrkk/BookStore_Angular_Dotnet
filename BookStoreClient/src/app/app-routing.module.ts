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

const routes: Routes = [
  {
    path: "",
    component: LayoutsComponent,
    children: [
      {
        path: "",
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }