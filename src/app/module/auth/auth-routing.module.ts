import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from 'src/app/auth/forgot-password/forgot-password.component';
import { SignUpComponent } from 'src/app/auth/sign-up/sign-up.component';
import { HomeComponent } from 'src/app/home/home.component';
import { GalleryComponent } from 'src/app/gallery/gallery.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent,  outlet: 'children'},
    // {path: 'sign-in', component: SignInComponent},
    {path: 'guest', component: GalleryComponent,  outlet: 'children'},
    {path: 'sign-up', component: SignUpComponent,  outlet: 'children'},
    {path: 'forgot-password', component: ForgotPasswordComponent,  outlet: 'children'}

];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
    declarations: [HomeComponent, ForgotPasswordComponent, SignUpComponent],
    exports: [HomeComponent, ForgotPasswordComponent , SignUpComponent],
})
export class AuthRoutingModule{}