import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { MainRoutingModule } from './modules/main/main-routing.module';
import { DndDirective } from './dnd.directive';
import { DbOperationsService } from './services/db-operations.service';
import { AuthService } from './services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatVideoModule } from 'mat-video';
import { VrGalleryModule } from './modules/vr-gallery/vr-gallery.module';
import { SiteComponent } from './modules/site/site.component';
import { SiteRoutingModule } from './modules/site/site.module';


@NgModule({
  declarations: [
    AppComponent,
    DndDirective,

  ],
  imports: [
AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
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

  ],
  providers: [DbOperationsService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
