import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule,
    AppRoutingModule
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
