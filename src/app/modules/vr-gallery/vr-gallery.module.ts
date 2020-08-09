import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VrGalleryComponent } from './vr-gallery.component';

const routes: Routes = [
    // {path: '', redirectTo: '', pathMatch: 'full'},
    // {path: 'vr-gallery', component: VrGalleryComponent},
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VrGalleryModule{}
