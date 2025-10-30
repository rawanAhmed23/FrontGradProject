import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home').then(m => m.Home), title: 'Home' },
  { path: 'contact', loadComponent: () => import('./components/contact/contact').then(m => m.Contact), title: 'Contact' },
  { path: 'menu', loadComponent: () => import('./components/menu/menu').then(m => m.Menu), title: 'Menu' },
  { path: 'login', loadComponent: () => import('./components/login/login').then(m => m.Login), title: 'Login' },
  { path: 'admin', loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard), title: 'Dashboard' },
  { path: 'popularItems', loadComponent: () => import('./components/popular-items/popular-items').then(m => m.PopularItems), title: 'Popular Items' },
  { path: 'order', loadComponent: () => import('./components/order/order').then(m => m.Order), title: 'Order' },

];
