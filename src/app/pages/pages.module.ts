import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './usuario/home/home.component';
import { FormsModule } from '@angular/forms';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { RouterModule } from '@angular/router';
import { NotifyComponent } from './admin/notify/notify.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ReservationManagementComponent } from './admin/reservation-management/reservation-management.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationLimitComponent } from './admin/reservation-limit/reservation-limit.component';
import { NosotrosComponent } from './usuario/nosotros/nosotros.component';
import { PromocionesListComponent } from './usuario/promociones/promociones.component';
import { TripDetailComponent } from './usuario/trip-details/trip-detail.component';
import { PromocionesDetailComponent } from './usuario/promociones/details-promocion/promociones.component';
import { TripComponent } from './usuario/trips/trip.component';
import { SearchComponent } from './usuario/search/search.component';
import { ReservaAddComponent } from './usuario/reserva/add/add-reserva.component';
import { AuthModule } from '../auth/auth.module';
import { PaymentDetailComponent } from './usuario/payment/payment-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AminBusesComponent } from './admin/admin-buses/buses.component';
import { AdminEstacionesComponent } from './admin/admin-estaciones/estaciones.component';
import { ViajesComponent } from './admin/admin-viajes/viajes.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BoletaComponent } from './usuario/boleta/boleta.component';

@NgModule({
  declarations: [
    HomeComponent,
    AdminDashComponent,
    NotifyComponent,
    AdminUsersComponent,
    ReservationManagementComponent,
    ProfileComponent,
    ReservationLimitComponent,
    PromocionesListComponent,
    NosotrosComponent,
    TripComponent,
    TripDetailComponent,
    PromocionesDetailComponent,
    SearchComponent,
    ReservaAddComponent,
    PaymentDetailComponent,
    AminBusesComponent,
    AdminEstacionesComponent,
    ViajesComponent,
    BoletaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AuthModule,
    NgSelectModule,

    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatOptionModule
  ],
  exports: [
    HomeComponent,
    AdminDashComponent,
    NotifyComponent,
    AdminUsersComponent,
    ReservationManagementComponent,
    ProfileComponent,
    ReservationLimitComponent,
    PromocionesListComponent,
    NosotrosComponent,
    TripComponent,
    PromocionesDetailComponent,
    SearchComponent,
    ReservaAddComponent,
    PaymentDetailComponent,
    AminBusesComponent,
    AdminEstacionesComponent,
    ViajesComponent,
    BoletaComponent
  ]
})
export class PagesModule { }
