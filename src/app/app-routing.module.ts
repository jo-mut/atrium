import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { AuthComponent } from './modules/auth/auth.component';
import { SiteRoutingModule } from './modules/site/site.module';
import { SiteComponent } from './modules/site/site.component';


const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
        path: 'auth', component: AuthComponent, children: [
            {
                path: '',
                loadChildren: () => AuthRoutingModule
            }
        ]
    },
    {
        path: 'site', component: SiteComponent, children: [
            {
                path: '',
                loadChildren: () => SiteRoutingModule
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

