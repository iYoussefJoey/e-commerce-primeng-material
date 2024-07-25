import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { CartComponent } from './pages/cart/cart.component';
import { BrandsComponent } from './pages/brands/brands.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home',component:HomeComponent},
    {path:'products',component:ProductsComponent},
    {path:'categories',component:CategoriesComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'cart',component:CartComponent},
    {path:'brands',component:BrandsComponent},








    {path:'**',component:NotfoundComponent},
];
