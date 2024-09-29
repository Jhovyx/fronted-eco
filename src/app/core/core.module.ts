import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthModule } from '../auth/auth.module';
import { PagesModule } from '../pages/pages.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    PagesModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
