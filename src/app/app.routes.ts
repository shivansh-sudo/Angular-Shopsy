import { Routes } from '@angular/router';
import { Products } from './products/products';
import { ProductDetails } from './product-details/product-details';
import { About } from './about/about';
import { ContactUs } from './contact-us/contact-us';
import { PageNotFound } from './page-not-found/page-not-found';
import { Login } from './login/login';
import { AuthGuard } from './auth.guard/auth.guard';
import { CartComponent } from './cart/cart';

export const routes: Routes = [
    {path:'',component:Login},
     { path: 'login', component: Login },
    {path: 'products' , component:Products, canActivate: [AuthGuard]},
    {path:'about',component:About},
    {path:'contact-us',component:ContactUs},
    {path: ':id', component:ProductDetails},
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },

    {path:'**',component:PageNotFound }
];
