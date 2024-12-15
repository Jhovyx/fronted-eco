import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './usuario/home/home.component';
import { FormsModule } from '@angular/forms';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { RouterModule } from '@angular/router';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ReservationManagementComponent } from './admin/reservation-management/reservation-management.component';
import { ProfileComponent } from './profile/profile.component';
import { NosotrosComponent } from './usuario/nosotros/nosotros.component';
import { PromocionesListComponent } from './usuario/promociones/promociones.component';
import { TripDetailComponent } from './usuario/trip-details/trip-detail.component';
import { PromocionesDetailComponent } from './usuario/promociones/details-promocion/promociones.component';
import { TripComponent } from './usuario/trips/trip.component';
import { AuthModule } from '../auth/auth.module';
import { PaymentDetailComponent } from './usuario/payment/payment-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AminBusesComponent } from './admin/admin-buses/buses.component';
import { AdminEstacionesComponent } from './admin/admin-estaciones/estaciones.component';
import { ViajesComponent } from './admin/admin-viajes/viajes.component';
import { BoletaComponent } from './usuario/boleta/boleta.component';
import { AsientosComponent } from './usuario/asientos/asientos.component';
import { ReservaComponent } from './usuario/reserva/reserva.component';

@NgModule({
  declarations: [
    HomeComponent,
    AdminDashComponent,
    AdminUsersComponent,
    ReservationManagementComponent,
    ProfileComponent,
    PromocionesListComponent,
    NosotrosComponent,
    TripComponent,
    TripDetailComponent,
    PromocionesDetailComponent,
    PaymentDetailComponent,
    AminBusesComponent,
    AdminEstacionesComponent,
    AsientosComponent,
    ViajesComponent,
    BoletaComponent,
    ReservaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AuthModule,
    NgSelectModule,
  ],
  exports: [
    HomeComponent,
    AdminDashComponent,
    AdminUsersComponent,
    ReservationManagementComponent,
    ProfileComponent,
    PromocionesListComponent,
    NosotrosComponent,
    TripComponent,
    PromocionesDetailComponent,
    PaymentDetailComponent,
    AminBusesComponent,
    AdminEstacionesComponent,
    ViajesComponent,
    AsientosComponent,
    BoletaComponent,
    ReservaComponent
  ]
})
export class PagesModule { }
