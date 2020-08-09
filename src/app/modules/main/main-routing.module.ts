import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivesComponent } from 'src/app/site/archives/archives.component';
import { CategoriesComponent } from 'src/app/site/categories/categories.component';
import { ArtistsComponent } from 'src/app/site/artists/artists.component';
import { EventsComponent } from 'src/app/site/events/events.component';
import { PageNotFoundComponent } from 'src/app/site/page-not-found/page-not-found.component';
import { CreateComponent } from 'src/app/admin/create/create.component';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from 'src/app/progress/progress.component';
import { NavbarComponent } from 'src/app/site/navbar/navbar.component';
import { SidebarComponent } from 'src/app/site/sidebar/sidebar.component';
import { ArchivesItemDetailComponent } from 'src/app/site/archives/archives-item-detail/archives-item-detail.component';
import { ArchivesItemComponent } from 'src/app/site/archives/archives-item/archives-item.component';
import { ExhibitionsComponent } from 'src/app/site/exhibition/exhibitions/exhibitions.component';
import { ExhibitionItemComponent } from 'src/app/site/exhibition/exhibition-item/exhibition-item.component';
import { ExhibitionDetailComponent } from 'src/app/site/exhibition/exhibition-detail/exhibition-detail.component';
import { CreateItemComponent } from 'src/app/admin/create-item/create-item.component';
import { ExhibitionViewComponent } from 'src/app/site/exhibition/exhibition-view/exhibition-view.component';
import { ArchivedViewComponent } from 'src/app/site/archives/archived-view/archived-view.component';
import { CreateModalComponent } from 'src/app/admin/create-modal/create-modal.component';
import { ArtworkModalComponent } from 'src/app/site/exhibition/artwork-modal/artwork-modal.component';
import { DashboardComponent } from 'src/app/admin/dashboard/dashboard/dashboard.component';
import { ContestsComponent } from 'src/app/site/contests/contests.component';
import { MainComponent } from './main.component';
import { MatVideoModule } from 'mat-video';


const routes: Routes = [

];

@NgModule({
  imports: [
  CommonModule,
     RouterModule.forChild(routes),
     MatVideoModule,
    ],
  declarations: [


  ],
  exports: [


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainRoutingModule{

}
