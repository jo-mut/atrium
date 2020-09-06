import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from 'src/app/site/home/home.component';
import { ToolbarComponent } from 'src/app/site/toolbar/toolbar.component';
import { SiteComponent } from './site.component';
import { VrGalleryComponent } from '../vr-gallery/vr-gallery.component';
import { VrGalleryModule } from '../vr-gallery/vr-gallery.module';
import { ExhibitionsComponent } from 'src/app/site/exhibition/exhibitions/exhibitions.component';
import { ExhibitionDetailComponent } from 'src/app/site/exhibition/exhibition-detail/exhibition-detail.component';
import { ExhibitionViewComponent } from 'src/app/site/exhibition/exhibition-view/exhibition-view.component';
import { ArchivesComponent } from 'src/app/site/archives/archives.component';
import { ArchivesItemDetailComponent } from 'src/app/site/archives/archives-item-detail/archives-item-detail.component';
import { CategoriesComponent } from 'src/app/site/categories/categories.component';
import { DashboardComponent } from 'src/app/site/admin/dashboard/dashboard.component';
import { CreateComponent } from 'src/app/admin/create/create.component';
import { ArtistsComponent } from 'src/app/site/artists/artists.component';
import { EventsComponent } from 'src/app/site/events/events.component';
import { ContestsComponent } from 'src/app/site/contests/contests.component';
import { PageNotFoundComponent } from 'src/app/site/page-not-found/page-not-found.component';
import { ArchivedViewComponent } from 'src/app/site/archives/archived-view/archived-view.component';
import { ProgressComponent } from 'src/app/progress/progress.component';
import { ExhibitionItemComponent } from 'src/app/site/exhibition/exhibition-item/exhibition-item.component';
import { ArchivesItemComponent } from 'src/app/site/archives/archives-item/archives-item.component';
import { CreateItemComponent } from 'src/app/admin/create-item/create-item.component';
import { CreateModalComponent } from 'src/app/admin/create-modal/create-modal.component';
import { ArtworkModalComponent } from 'src/app/site/exhibition/artwork-modal/artwork-modal.component';
import { NavbarComponent } from 'src/app/site/navbar/navbar.component';
import { SidebarComponent } from 'src/app/site/sidebar/sidebar.component';
import { FeaturedArtworksComponent } from 'src/app/site/featured-artworks/featured-artworks.component';
import { SubmitArtworksComponent } from 'src/app/site/submit-artworks/submit-artworks.component';
import { FeaturedItemComponent } from 'src/app/site/featured-artworks/featured-item/featured-item.component';
import { FeaturedDetailComponent } from 'src/app/site/featured-artworks/featured-detail/featured-detail.component';
import { CallComponent } from 'src/app/site/call/call.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CreateProfileComponent } from 'src/app/site/submit-artworks/create-profile/create-profile.component';
import { AddArtworksComponent } from 'src/app/site/submit-artworks/add-artworks/add-artworks.component';
import { AdminComponent } from "../../site/admin/admin.component";
import { ArtworkItemComponent } from "../../site/admin/artwork-item/artwork-item.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: HomeComponent },
  { path: 'exhibitions', component: ExhibitionsComponent },
  { path: 'exhibition/:id', component: ExhibitionDetailComponent },
  { path: 'exhibition/exhibition-detail/:id', component: ExhibitionViewComponent },
  { path: 'archives', component: ArchivesComponent },
  { path: 'archived-exhibition/:id', component: ArchivesItemDetailComponent },
  { path: 'archived-exhibition/archived-exhibition-detail/:id', component: ArchivedViewComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create', component: CreateComponent },
  { path: 'call', component: CallComponent },
  { path: 'artists', component: ArtistsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contests', component: ContestsComponent },
  { path: 'featured', component: FeaturedArtworksComponent },
  { path: 'submit-works', component: SubmitArtworksComponent },
  { path: 'create-profile', component: CreateProfileComponent },
  { path: 'add-artworks', component: AddArtworksComponent },
  { path: 'admin', component: AdminComponent },

  {
    path: 'vr-gallery', component: VrGalleryComponent, children: [
      {
        path: '',
        loadChildren: () => VrGalleryModule
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MglTimelineModule,
    CarouselModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,

  ],
  declarations: [
    CreateProfileComponent,
    AddArtworksComponent,
    VrGalleryComponent,
    HomeComponent,
    SiteComponent,
    ToolbarComponent,
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
    CreateItemComponent,
    SidebarComponent,
    NavbarComponent,
    CreateModalComponent,
    ExhibitionViewComponent,
    ArtworkModalComponent,
    ArchivedViewComponent,
    DashboardComponent,
    FeaturedArtworksComponent,
    FeaturedItemComponent,
    FeaturedDetailComponent,
    ContestsComponent,
    SubmitArtworksComponent,
    CallComponent,
    AdminComponent,
    ArtworkItemComponent,

  ],
  exports: [
    AdminComponent,
    CreateProfileComponent,
    AddArtworksComponent,
    VrGalleryComponent,
    SidebarComponent,
    NavbarComponent,
    SiteComponent,
    HomeComponent,
    ToolbarComponent,
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
    FeaturedArtworksComponent,
    FeaturedItemComponent,
    FeaturedDetailComponent,
    SubmitArtworksComponent,
    CallComponent,
    ArtworkItemComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SiteRoutingModule {
}
