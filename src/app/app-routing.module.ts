import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { AuthComponent } from './modules/auth/auth.component';
import { SiteRoutingModule } from './modules/site/site.module';
import { SiteComponent } from './modules/site/site.component';
import { CreateProfileComponent } from './site/create-profile/create-profile.component';
import { VrGalleryComponent } from './modules/vr-gallery/vr-gallery.component';
import { VrGalleryModule } from './modules/vr-gallery/vr-gallery.module';
import { VirtualGalleryComponent } from './virtual-gallery/virtual-gallery.component';
import { ProfileInfoComponent } from './site/create-profile/profile-info/profile-info.component';
import { SocialMediaInfoComponent } from './site/create-profile/social-media-info/social-media-info.component';
import { UploadFilesComponent } from './site/add-artworks/upload-files/upload-files.component';
import { ArtworkInfoComponent } from './site/add-artworks/artwork-info/artwork-info.component';
import { ConfirmSubmissionComponent } from './site/add-artworks/confirm-submission/confirm-submission.component';
import { VrVideoComponent } from './virtual-gallery/vr-video/vr-video.component';
import { SorryComponent } from './site/sorry/sorry.component';
import { CurrentExhibitionsComponent } from './virtual-gallery/current-exhibitions/current-exhibitions.component';


const routes: Routes = [
    { path: '', redirectTo: 'project', pathMatch: 'full' },
    { path: 'previous-exhibitions', component: VirtualGalleryComponent },
    { path: 'previous-exhibitions/:id', component: VirtualGalleryComponent },
    { path: 'exhibitions', component: CurrentExhibitionsComponent },
    { path: 'exhibitions/:id', component: VrVideoComponent },
    { path: 'create-profile', component: CreateProfileComponent },
    { path: 'artist-profile', component: ProfileInfoComponent },
    { path: 'social-links', component: SocialMediaInfoComponent },
    { path: 'confirm-submission', component: ConfirmSubmissionComponent },
    { path: 'artwork-info', component: ArtworkInfoComponent },
    { path: 'upload-files', component: UploadFilesComponent },
    { path: 'sorry', component: SorryComponent},

    {
        path: 'auth', component: AuthComponent, children: [
            {
                path: '',
                loadChildren: () => AuthRoutingModule
            }
        ]
    },
    {
        path: 'project', component: SiteComponent, children: [
            {
                path: '',
                loadChildren: () => SiteRoutingModule
            }
        ]
    },

    // {
    //     path: 'gallery', component: VrGalleryComponent, children: [
    //         {
    //             path: '',
    //             loadChildren: () => VrGalleryModule
    //         }
    //     ]
    // },

];

@NgModule({
    imports: [RouterModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppRoutingModule { }

