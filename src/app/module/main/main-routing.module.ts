import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivesComponent } from 'src/app/archives/archives.component';
import { CategoriesComponent } from 'src/app/categories/categories.component';
import { ArtistsComponent } from 'src/app/artists/artists.component';
import { EventsComponent } from 'src/app/events/events.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { CreateComponent } from 'src/app/admin/create/create.component';
import { GalleryComponent } from 'src/app/gallery/gallery.component';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from 'src/app/progress/progress.component';
import { NavbarComponent } from 'src/app/layouts/navbar/navbar.component';
import { SidebarComponent } from 'src/app/layouts/sidebar/sidebar.component';
import { GalleryItemComponent } from 'src/app/gallery/gallery-item/gallery-item.component';
import { ArchivesItemDetailComponent } from 'src/app/archives/archives-item-detail/archives-item-detail.component';
import { GalleryItemDetailComponent } from 'src/app/gallery/gallery-item-detail/gallery-item-detail.component';
import { ArchivesItemComponent } from 'src/app/archives/archives-item/archives-item.component';
import { SignInComponent } from 'src/app/auth/sign-in/sign-in.component';


const routes: Routes = [
  {path: '', redirectTo: 'main/gallery', pathMatch: 'full'},
  {path: 'main/gallery', component: GalleryComponent},
  {path: 'main/archives', component: ArchivesComponent},
  {path: 'main/categories', component: CategoriesComponent},
  {path: 'main/create', component: CreateComponent},
  {path: 'main/artists', component: ArtistsComponent},
  {path: 'main/events', component: EventsComponent},
  {path: 'main/sign-in', component: SignInComponent},


  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [MainComponent, GalleryComponent, 
    ProgressComponent, ArchivesComponent, GalleryItemComponent,
    ArchivesItemComponent, ArchivesItemDetailComponent,
    GalleryItemDetailComponent, CategoriesComponent, 
    EventsComponent, PageNotFoundComponent, ArtistsComponent, SignInComponent,
     CreateComponent, NavbarComponent, SidebarComponent],
  exports: [MainComponent, ArchivesComponent, GalleryComponent, 
    CategoriesComponent, ArtistsComponent, EventsComponent, ProgressComponent,
    PageNotFoundComponent, CreateComponent, GalleryItemComponent, SignInComponent,
    ArchivesItemComponent, ArchivesItemDetailComponent,
    GalleryItemDetailComponent,]
})
export class MainRoutingModule{

}