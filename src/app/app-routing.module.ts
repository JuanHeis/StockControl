import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { SystemComponent } from './system/system/system.component';
import { ProductoFormComponent } from './system/producto/producto-form/producto-form.component';
import { ProductoListComponent } from './system/producto/producto-list/producto-list.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'user',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'system',
    component: SystemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'system/addproduct',
    component: ProductoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'system/listproduct',
    component: ProductoListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
