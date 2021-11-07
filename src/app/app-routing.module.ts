import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path : '', component: HomeComponent , canActivate:[AuthGuard]},
  { path: 'orders', component: OrdersComponent, canActivate:[AuthGuard, RoleGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
