import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './usuario/home/home.component';
import { WhatsappComponent } from './usuario/whatsapp/whatsapp.component';
import { FormsModule } from '@angular/forms';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { RouterModule } from '@angular/router';
import { NotifyComponent } from './admin/notify/notify.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ReservationManagementComponent } from './admin/reservation-management/reservation-management.component';
import { ListTripComponent } from './admin/list-trip/list-trip.component';
import { AddTripComponent } from './admin/add-trip/add-trip.component';
import { EditTripComponent } from './admin/edit-trip/edit-trip.component';
import { AdministratorComponent } from './admin/administrator/administrator.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationLimitComponent } from './admin/reservation-limit/reservation-limit.component';
import { NosotrosComponent } from './usuario/nosotros/nosotros.component';
import { PromocionesListComponent } from './usuario/promociones/promociones.component';
import { TripDetailComponet } from './usuario/trip-details/trip-detail.component';
import { RegisterComponent } from './usuario/register/register.component';
import { PromocionesDetailComponent } from './usuario/promociones/details-promocion/promociones.component';
import { TripComponent } from './usuario/trips/trip.component';

@NgModule({
  declarations: [
    HomeComponent,
    WhatsappComponent,
    AdminDashComponent,
    NotifyComponent,
    AdminUsersComponent,
    ReservationManagementComponent,
    ListTripComponent,
    AddTripComponent,
    EditTripComponent,
    AdministratorComponent,
    ProfileComponent,
    ReservationLimitComponent,
    PromocionesListComponent,
    NosotrosComponent,
    TripComponent,
    TripDetailComponet,
    RegisterComponent,
    PromocionesDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    WhatsappComponent,
    AdminDashComponent,
    NotifyComponent,
    AdminUsersComponent,
    ReservationManagementComponent,
    ListTripComponent,
    AddTripComponent,
    EditTripComponent,
    AdministratorComponent,
    ProfileComponent,
    ReservationLimitComponent,
    PromocionesListComponent,
    NosotrosComponent,
    TripComponent,
    RegisterComponent,
    PromocionesDetailComponent
  ]
})
export class PagesModule { }
