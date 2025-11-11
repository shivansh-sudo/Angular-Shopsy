import { Routes } from '@angular/router';
import { Products } from './products/products';
import { ProductDetails } from './product-details/product-details';
import { About } from './about/about';
import { ContactUs } from './contact-us/contact-us';
import { PageNotFound } from './page-not-found/page-not-found';
import { Login } from './login/login';
import { AuthGuard } from './auth.guard/auth.guard';
import { Cart } from "./cart/cart"; // This is correct

export const routes: Routes = [
    {path:'',component:Products},
    {path: 'login', component: Login},
    {path: 'products' , component:Products},
    {path: 'about',component:About},
    {path: 'contact-us',component:ContactUs},
    // {path: 'cart', component: Cart },
     {path: 'cart', component: Cart, canActivate: [AuthGuard] },
    {path: ':id', component:ProductDetails},
    // {path: 'cart', component: Cart, canActivate: [AuthGuard] },


    {path:'**',component:PageNotFound }
];
//  Angular-Don_John_Shop