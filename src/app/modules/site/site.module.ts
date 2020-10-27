import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from 'src/app/site/home/home.component';
import { SiteComponent } from './site.component';
import { VrGalleryComponent } from '../vr-gallery/vr-gallery.component';
import { VrGalleryModule } from '../vr-gallery/vr-gallery.module';
import { CategoriesComponent } from 'src/app/site/categories/categories.component';
import { DashboardComponent } from 'src/app/site/admin/dashboard/dashboard.component';
import { ArtistsComponent } from 'src/app/site/artists/artists.component';
import { PageNotFoundComponent } from 'src/app/site/page-not-found/page-not-found.component';
import { ProgressComponent } from 'src/app/progress/progress.component';
import { NavbarComponent } from 'src/app/site/navbar/navbar.component';
import { SidebarComponent } from 'src/app/site/sidebar/sidebar.component';
import { CallComponent } from 'src/app/site/call/call.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AddArtworksComponent } from 'src/app/site/add-artworks/add-artworks.component';
import { AdminComponent } from "../../site/admin/admin.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TipsComponent } from 'src/app/site/tips/tips.component';
import { ArtworkItemComponent } from 'src/app/site/artworks/artwork-item/artwork-item.component';
import { AddCuratorModalComponent } from 'src/app/site/admin/curators/add-curator-modal/add-curator-modal.component';
import { ArtworksComponent } from 'src/app/site/artworks/artworks.component';
import { CuratorsComponent } from 'src/app/site/admin/curators/curators.component';
import { ScoreComponent } from 'src/app/site/admin/score/score.component';
import { ProfileComponent } from 'src/app/site/profile/profile.component';
import { ArtworksDetailComponent } from 'src/app/site/artworks/artworks-detail/artworks-detail.component';
import { TermModalComponent } from 'src/app/site/create-profile/term-modal/term-modal.component';
import { HostProfileModalComponent } from 'src/app/site/admin/host-profile-modal/host-profile-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { CampaignComponent } from 'src/app/site/campaign/campaign.component';
import { TeamComponent } from 'src/app/site/team/team.component';
import { GuidelinesComponent } from 'src/app/site/guidelines/guidelines.component';
import { SuccessfulComponent } from 'src/app/site/successful/successful.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ArtworkScoreComponent } from 'src/app/site/admin/score/artwork-score/artwork-score.component';
import { ScoredItemComponent } from 'src/app/site/admin/scored-item/scored-item.component';
import { SelectArtworksComponent } from 'src/app/site/admin/select-artworks/select-artworks.component';
import { ScoreArtworksComponent } from 'src/app/site/admin/score-artworks/score-artworks.component';
import { FilterArtworksComponent } from 'src/app/site/admin/filter-artworks/filter-artworks.component';
import { UploadModalComponent } from 'src/app/site/add-artworks/upload-modal/upload-modal.component';
import { ScoredArtworksComponent } from 'src/app/site/admin/scored-artworks/scored-artworks.component';
import { SelectItemComponent } from 'src/app/site/admin/select-artworks/select-item/select-item.component';
import { FilterItemComponent } from 'src/app/site/admin/filter-artworks/filter-item/filter-item.component';
// import { ToastrModule } from 'ngx-toastr';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SignInComponent } from 'src/app/site/sign-in/sign-in.component';
import { MatInputModule } from '@angular/material/input';
import { ArtworkModalComponent } from 'src/app/site/admin/filter-artworks/artwork-modal/artwork-modal.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'stories', component: CampaignComponent },
  { path: 'home', component: HomeComponent },
  { path: 'team', component: TeamComponent },
  { path: 'successful', component: SuccessfulComponent },
  { path: 'guidelines', component: CallComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'artists', component: ArtistsComponent },
  // { path: 'gallery', component: ArtworksComponent },
  { path: 'add-artworks', component: AddArtworksComponent },
  { path: 'tips', component: TipsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/artworks', component: ArtworksComponent },
  { path: 'admin/score', component: ScoreArtworksComponent },
  { path: 'admin/scored-artworks', component: ScoredArtworksComponent },
  { path: 'admin/select-artworks', component: SelectArtworksComponent },
  { path: 'admin/filter-artworks', component: FilterArtworksComponent },
  { path: 'admin/categories/photos', component: CategoriesComponent },
  { path: 'admin/categories/videos', component: CategoriesComponent },
  { path: 'profile/:id', component: ProfileComponent },
  // { path: 'admin/scores/:id', component: ScoreComponent },
  { path: 'admin/score/:id', component: ScoreComponent },
  { path: 'admin/artwork-score/:id', component: ArtworkScoreComponent },
  { path: 'admin/artworks/:id', component: ArtworksDetailComponent },
  { path: 'admin/artists', component: ArtistsComponent },
  { path: 'admin/artists/:id', component: ProfileComponent },
  { path: 'admin/team/profile/:id', component: ProfileComponent },

  {
    path: 'gallery', component: VrGalleryComponent, children: [
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
    MatInputModule,
    MatListModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxNavbarModule,
    MatExpansionModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    MatStepperModule,
    PdfViewerModule
    //  ToastrModule.forRoot()   

  ],
  declarations: [
    // CreateProfileComponent,
    ArtworkModalComponent,
    AddArtworksComponent,
    VrGalleryComponent,
    HomeComponent,
    SiteComponent,
    ProgressComponent,
    CategoriesComponent,
    PageNotFoundComponent,
    ArtistsComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    CallComponent,
    AdminComponent,
    TipsComponent,
    ArtworksComponent,
    ArtworkItemComponent,
    AddCuratorModalComponent,
    ScoreComponent,
    ArtworksDetailComponent,
    ProfileComponent,
    TermModalComponent,
    HostProfileModalComponent,
    TeamComponent,
    GuidelinesComponent,
    CampaignComponent,
    SuccessfulComponent,
    ScoredArtworksComponent,
    ArtworkScoreComponent,
    ScoredItemComponent,
    UploadModalComponent,
    FilterArtworksComponent,
    ScoreArtworksComponent,
    SelectArtworksComponent,
    FilterItemComponent,
    SelectItemComponent,
    SignInComponent



  ],
  exports: [
    AdminComponent,
    // CreateProfileComponent,
    AddArtworksComponent,
    VrGalleryComponent,
    SidebarComponent,
    NavbarComponent,
    SiteComponent,
    HomeComponent,
    ArtworkModalComponent,
    CategoriesComponent,
    ArtistsComponent,
    ProgressComponent,
    PageNotFoundComponent,
    DashboardComponent,
    CallComponent,
    TipsComponent,
    ArtworksComponent,
    ArtworkItemComponent,
    AddCuratorModalComponent,
    ScoreComponent,
    ArtworksDetailComponent,
    ProfileComponent,
    TermModalComponent,
    HostProfileModalComponent,
    TeamComponent,
    GuidelinesComponent,
    CampaignComponent,
    SuccessfulComponent,
    ScoredArtworksComponent,
    ScoredItemComponent,
    UploadModalComponent,
    FilterArtworksComponent,
    ScoreArtworksComponent,
    SelectArtworksComponent,
    FilterItemComponent,
    SelectItemComponent,
    SignInComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SiteRoutingModule {
}
