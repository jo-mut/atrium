import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthRoutingModule } from './module/auth/auth-routing.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MainRoutingModule } from './module/main/main-routing.module';
import { DndDirective } from './dnd.directive';
import { DbOperationsService } from './services/db-operations.service';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
  
    
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule, AppRoutingModule,  BrowserAnimationsModule,
    AngularFireAuthModule, AngularFireModule, AngularFirestoreModule,
    AngularFireStorageModule, MainRoutingModule, AuthRoutingModule,
  ],
  providers: [DbOperationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
