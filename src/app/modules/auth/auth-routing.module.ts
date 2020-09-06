import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from 'src/app/auth/forgot-password/forgot-password.component';
import { SignUpComponent } from 'src/app/auth/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from 'src/app/auth/sign-in/sign-in.component';
import { AuthComponent } from './auth.component';
// import { HomeComponent } from 'src/app/site/home/home.component';

const routes: Routes = [
    {path: '', redirectTo: 'landing', pathMatch: 'full'},
    // {path: 'landing', component: HomeComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent}

];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
    declarations: [AuthComponent, ForgotPasswordComponent, SignUpComponent, SignInComponent],
    exports: [AuthComponent, ForgotPasswordComponent , SignUpComponent, SignInComponent],
})
export class AuthRoutingModule{}