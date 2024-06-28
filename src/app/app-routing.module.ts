import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'' , component:AllProductsComponent },
  {path:'wishlist' , component:WishlistComponent },
  {path:'cart' , component:CartComponent },
  {path:'user/register' , component:RegisterComponent },
  {path:'user/login' , component:LoginComponent },
  {path:'view-product/:id' , component:ViewProductComponent },
  {path:'check-out' , component:CheckoutComponent },
  {path:'**' , component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
