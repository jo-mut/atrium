import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './module/main/main.component';
import { MainRoutingModule } from './module/main/main-routing.module';
import { AuthRoutingModule } from './module/auth/auth-routing.module';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
      path: 'main', component: MainComponent, children: [
          {
              path: 'main',
              loadChildren: () => MainRoutingModule
          },
      ]
  },
  {
      path: 'auth', component: HomeComponent, children: [
          {
              path: 'auth',
              loadChildren: ()=> AuthRoutingModule
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

