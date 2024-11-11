import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './usuario/home/home.component';
import { FormsModule } from '@angular/forms';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { RouterModule } from '@angular/router';
import { NotifyComponent } from './admin/notify/notify.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ReservationManagementComponent } from './admin/reservation-management/reservation-management.component';
import { ListTripComponent } from './admin/list-trip/list-trip.component';
import { AddTripComponent } from './admin/add-trip/add-trip.component';
import { EditTripComponent } from './admin/edit-trip/edit-trip.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationLimitComponent } from './admin/reservation-limit/reservation-limit.component';
import { NosotrosComponent } from './usuario/nosotros/nosotros.component';
import { PromocionesListComponent } from './usuario/promociones/promociones.component';
import { TripDetailComponet } from './usuario/trip-details/trip-detail.component';
import { PromocionesDetailComponent } from './usuario/promociones/details-promocion/promociones.component';
import { TripComponent } from './usuario/trips/trip.component';
import { SearchComponent } from './usuario/search/search.component';
import { ReservaAddComponent } from './usuario/reserva/add/add-reserva.component';
import { AuthModule } from '../auth/auth.module';
import { PaymentDetailComponent } from './usuario/payment/payment-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    HomeComponent,
    AdminDashComponent,
    NotifyComponent,
    AdminUsersComponent,
    ReservationManagementComponent,
    ListTripComponent,
    AddTripComponent,
    EditTripComponent,
    ProfileComponent,
    ReservationLimitComponent,
    PromocionesListComponent,
    NosotrosComponent,
    TripComponent,
    TripDetailComponet,
    PromocionesDetailComponent,
    SearchComponent,
    ReservaAddComponent,
    PaymentDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AuthModule,
    NgSelectModule
  ],
  exports: [
    HomeComponent,
    AdminDashComponent,
    NotifyComponent,
    AdminUsersComponent,
    ReservationManagementComponent,
    ListTripComponent,
    AddTripComponent,
    EditTripComponent,
    ProfileComponent,
    ReservationLimitComponent,
    PromocionesListComponent,
    NosotrosComponent,
    TripComponent,
    PromocionesDetailComponent,
    SearchComponent,
    ReservaAddComponent,
    PaymentDetailComponent
  ]
})
export class PagesModule { }
