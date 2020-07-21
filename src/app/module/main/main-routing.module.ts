import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivesComponent } from 'src/app/archives/archives.component';
import { CategoriesComponent } from 'src/app/categories/categories.component';
import { ArtistsComponent } from 'src/app/artists/artists.component';
import { EventsComponent } from 'src/app/events/events.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { CreateComponent } from 'src/app/admin/create/create.component';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from 'src/app/progress/progress.component';
import { NavbarComponent } from 'src/app/layouts/navbar/navbar.component';
import { SidebarComponent } from 'src/app/layouts/sidebar/sidebar.component';
import { ArchivesItemDetailComponent } from 'src/app/archives/archives-item-detail/archives-item-detail.component';
import { ArchivesItemComponent } from 'src/app/archives/archives-item/archives-item.component';
import { ExhibitionsComponent } from 'src/app/exhibition/exhibitions/exhibitions.component';
import { ExhibitionItemComponent } from 'src/app/exhibition/exhibition-item/exhibition-item.component';
import { ExhibitionDetailComponent } from 'src/app/exhibition/exhibition-detail/exhibition-detail.component';
import { CreateItemComponent } from 'src/app/admin/create-item/create-item.component';
import { ExhibitionViewComponent } from 'src/app/exhibition/exhibition-view/exhibition-view.component';
import { ArchivedViewComponent } from 'src/app/archives/archived-view/archived-view.component';
import { CreateModalComponent } from 'src/app/admin/create-modal/create-modal.component';
import { ArtworkModalComponent } from 'src/app/exhibition/artwork-modal/artwork-modal.component';
import { DashboardComponent } from 'src/app/admin/dashboard/dashboard/dashboard.component';
import { ContestsComponent } from 'src/app/contests/contests.component';
import { MainComponent } from './main.component';
import { MatVideoModule } from 'mat-video';


const routes: Routes = [
  {path: '', redirectTo: 'exhibitions', pathMatch: 'full'},
  {path: 'exhibitions', component: ExhibitionsComponent},
  {path: 'exhibition/:id', component: ExhibitionDetailComponent},
  {path: 'exhibition/exhibition-detail/:id', component: ExhibitionViewComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'create', component: CreateComponent},
  {path: 'artists', component: ArtistsComponent},
  {path: 'events', component: EventsComponent},
  {path: 'contests', component: ContestsComponent},
  {path: 'archives', component: ArchivesComponent},
  {path: 'archived-exhibition/:id', component: ArchivesItemDetailComponent},
  {path: 'archived-exhibition/archived-exhibition-detail/:id', component: ArchivedViewComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
  CommonModule,
     RouterModule.forChild(routes),
     MatVideoModule, 
    ],
  declarations: [
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
    CreateItemComponent,
    SidebarComponent,
    CreateModalComponent,
    ExhibitionViewComponent,
    ArtworkModalComponent,
    ArchivedViewComponent,
    DashboardComponent,
    ContestsComponent,
    MainComponent
    
  ],
  exports: [
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
    CreateItemComponent,
    ArchivesItemDetailComponent,
    CreateModalComponent,
    ExhibitionViewComponent,
    ArtworkModalComponent,
    ArchivedViewComponent,
    DashboardComponent,
    ContestsComponent,
    MainComponent

  ]
})
export class MainRoutingModule{

}