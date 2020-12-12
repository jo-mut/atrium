import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { DndDirective } from './dnd.directive';
import { DbOperationsService } from './services/db-operations.service';
import { AuthService } from './services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SiteRoutingModule } from './modules/site/site.module';
import { CreateProfileComponent } from './site/create-profile/create-profile.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { VrGalleryModule } from './modules/vr-gallery/vr-gallery.module';
import { VirtualGalleryComponent } from './virtual-gallery/virtual-gallery.component';
import { ProfileInfoComponent } from './site/create-profile/profile-info/profile-info.component';
import { SocialMediaInfoComponent } from './site/create-profile/social-media-info/social-media-info.component';
import { ArtworkInfoComponent } from './site/add-artworks/artwork-info/artwork-info.component';
import { ConfirmSubmissionComponent } from './site/add-artworks/confirm-submission/confirm-submission.component';
import { UploadFilesComponent } from './site/add-artworks/upload-files/upload-files.component';
import { VrVideoItemComponent } from './vr-video-item/vr-video-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateProfileComponent,
    DndDirective,
    VirtualGalleryComponent,
    ProfileInfoComponent,
    SocialMediaInfoComponent,
    UploadFilesComponent,
    ArtworkInfoComponent,
    ConfirmSubmissionComponent,
    VrVideoItemComponent,

  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireAnalyticsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AuthRoutingModule,
    SiteRoutingModule,
    VrGalleryModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatRadioModule,
    MatFormFieldModule
  ],
  providers: [DbOperationsService, AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
