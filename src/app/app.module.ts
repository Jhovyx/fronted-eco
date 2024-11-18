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

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

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
    HttpClientModule,

     // Módulos de Angular Material
     MatInputModule,
     MatFormFieldModule,
     MatAutocompleteModule,
     MatSelectModule,
     MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
