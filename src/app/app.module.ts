import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// Firebase imports

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    PagesModule,
    SharedModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//firebase deploy
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyAK4I3Kh73hkbawjB-0c6kk0m2xDnvyctw",
  authDomain: "prueba-f7cd9.firebaseapp.com",
  databaseURL: "https://prueba-f7cd9-default-rtdb.firebaseio.com",
  projectId: "prueba-f7cd9",
  storageBucket: "prueba-f7cd9.appspot.com",
  messagingSenderId: "784765850499",
  appId: "1:784765850499:web:e3cc2cc33c3b5837115cb6"
};*/

// Initialize Firebase
//const app = initializeApp(firebaseConfig);