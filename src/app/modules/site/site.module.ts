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
import { DashboardComponent } from 'src/app/admin/dashboard/dashboard/dashboard.component';
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


const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'landing', component: HomeComponent },
    { path: 'exhibitions', component: ExhibitionsComponent },
    { path: 'exhibition/:id', component: ExhibitionDetailComponent },
    { path: 'exhibition/exhibition-detail/:id', component: ExhibitionViewComponent },
    { path: 'archives', component: ArchivesComponent },
    { path: 'archived-exhibition/:id', component: ArchivesItemDetailComponent },
    { path: 'archived-exhibition/archived-exhibition-detail/:id', component: ArchivedViewComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'create', component: CreateComponent },
    { path: 'artists', component: ArtistsComponent },
    { path: 'events', component: EventsComponent },
    { path: 'contests', component: ContestsComponent },
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
        FormsModule],
    declarations: [
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
        ContestsComponent,
    ],
    exports: [
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

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SiteRoutingModule { }
