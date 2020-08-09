import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { ArtworksComponent } from 'src/app/admin/artworks/artworks.component';
import { CategoriesComponent } from 'src/app/admin/categories/categories.component';
import { ArtistsComponent } from './../../admin/artists/artists.component';
import { CuratorsComponent } from 'src/app/admin/curators/curators.component';
import { ContestsComponent } from 'src/app/admin/contests/contests.component';
import { EventsComponent } from 'src/app/admin/events/events.component';
import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatSidenavModule} from  '@angular/material/sidenav';
import { MatGridListModule} from  '@angular/material/grid-list';
import { MatIconModule} from  '@angular/material/icon';
import { MatListModule} from  '@angular/material/list';



const routes: Routes = [
    { path: '', redirectTo: 'artworks', pathMatch: 'full' },
    { path: 'artworks', component: ArtworksComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'artists', component: ArtistsComponent },
    { path: 'curators', component: CuratorsComponent },
    { path: 'contests', component: ContestsComponent },
    { path: 'events', component: EventsComponent },
   

];

@NgModule({
    imports: [
CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatGridListModule,
        MatIconModule,
        MatListModule,

    ],
    declarations: [
        AdminComponent,
        ArtworksComponent,
        CategoriesComponent,
        ArtistsComponent,
        CuratorsComponent,
        ContestsComponent,
        EventsComponent
    ],
    exports: [
        AdminComponent,
        ArtworksComponent,
        CategoriesComponent,
        ArtistsComponent,
        CuratorsComponent,
        ContestsComponent,
        EventsComponent,
    ],
})
export class AdminRoutingModule { }