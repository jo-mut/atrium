import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivesComponent } from 'src/app/archives/archives.component';
import { CategoriesComponent } from 'src/app/categories/categories.component';
import { ArtistsComponent } from 'src/app/artists/artists.component';
import { EventsComponent } from 'src/app/events/events.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { CreateComponent } from 'src/app/admin/create/create.component';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from 'src/app/progress/progress.component';
import { NavbarComponent } from 'src/app/layouts/navbar/navbar.component';
import { SidebarComponent } from 'src/app/layouts/sidebar/sidebar.component';
import { ArchivesItemDetailComponent } from 'src/app/archives/archives-item-detail/archives-item-detail.component';
import { ArchivesItemComponent } from 'src/app/archives/archives-item/archives-item.component';
import { ExhibitionsComponent } from 'src/app/exhibition/exhibitions/exhibitions.component';
import { ExhibitionItemComponent } from 'src/app/exhibition/exhibition-item/exhibition-item.component';
import { ExhibitionDetailComponent } from 'src/app/exhibition/exhibition-detail/exhibition-detail.component';


const routes: Routes = [
  {path: '', redirectTo: 'exhibitions', pathMatch: 'full'},
  {path: 'exhibitions', component: ExhibitionsComponent},
  {path: 'archives', component: ArchivesComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'create', component: CreateComponent},
  {path: 'artists', component: ArtistsComponent},
  {path: 'events', component: EventsComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    MainComponent, 
    ProgressComponent, 
    ArchivesComponent, 
    ArchivesItemComponent, 
    ArchivesItemDetailComponent, 
    ExhibitionsComponent,
    ExhibitionItemComponent, 
    ExhibitionDetailComponent,
    CategoriesComponent, 
    EventsComponent, 
    PageNotFoundComponent,
    ArtistsComponent, 
    CreateComponent,
    NavbarComponent,
    SidebarComponent],
  exports: [
    MainComponent, 
    ArchivesComponent, 
    CategoriesComponent, 
    ArtistsComponent, 
    EventsComponent, 
    ProgressComponent,
    PageNotFoundComponent, 
    CreateComponent, 
    ExhibitionsComponent,
    ExhibitionItemComponent, 
    ExhibitionDetailComponent,
    ArchivesItemComponent, 
    ArchivesItemDetailComponent,]
})
export class MainRoutingModule{

}