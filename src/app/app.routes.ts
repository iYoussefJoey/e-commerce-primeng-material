import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { CartComponent } from './pages/cart/cart.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { authenticationGuard } from './authentication.guard';
import { authenticationLoggedGuard } from './authentication-logged.guard';
import { ProductsliderComponent } from './pages/home/component/productslider/productslider.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { AllOrdersComponent } from './pages/all-orders/all-orders.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path:'home',canActivate:[authenticationGuard], component:HomeComponent},
    {path:'products',canActivate:[authenticationGuard], component:ProductsComponent},
    {path:'categories',canActivate:[authenticationGuard],component:CategoriesComponent},
    {path:'cart',canActivate:[authenticationGuard],component:CartComponent},
    {path:'productdetails/:id',canActivate:[authenticationGuard],component:ProductsliderComponent},
    {path:'brands',canActivate:[authenticationGuard],component:BrandsComponent},
    {path:'register',canActivate:[authenticationLoggedGuard],component:RegisterComponent},
    {path:'login',canActivate:[authenticationLoggedGuard], component:LoginComponent},
    {path:'checkout/:cartId',canActivate:[authenticationGuard],component:CheckOutComponent},
    {path:'allorders',canActivate:[authenticationGuard],component:AllOrdersComponent},
    {path:'settings',canActivate:[authenticationGuard], loadChildren:()=>import('./setting/setting.module').then(m=>m.SettingModule)},
    {path:'cartsitem',canActivate:[authenticationGuard], loadChildren:()=>import('./cartModule/cart.module').then(m=>m.CartModule)},








    {path:'**',component:NotfoundComponent},
];
