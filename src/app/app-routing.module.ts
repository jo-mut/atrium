import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './module/main/main.component';
import { MainRoutingModule } from './module/main/main-routing.module';
import { AuthRoutingModule } from './module/auth/auth-routing.module';
import { AuthComponent } from './module/auth/auth.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
      path: 'main', component: MainComponent, children: [
          {
              path: '',
              loadChildren: () => MainRoutingModule
          },
      ]
  },
  {
      path: 'auth', component: AuthComponent, children: [
          {
              path: '',
              loadChildren: () => AuthRoutingModule
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

