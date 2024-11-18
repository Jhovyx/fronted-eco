import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/usuario/home/home.component';
import { NotifyComponent } from './pages/admin/notify/notify.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { ReservationManagementComponent } from './pages/admin/reservation-management/reservation-management.component';
import { AdminDashComponent } from './pages/admin/admin-dash/admin-dash.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReservationLimitComponent } from './pages/admin/reservation-limit/reservation-limit.component';
import { NosotrosComponent } from './pages/usuario/nosotros/nosotros.component';
import { PromocionesListComponent } from './pages/usuario/promociones/promociones.component';
import { BoletaComponent } from './pages/usuario/boleta/boleta.component';
import { TripComponent } from './pages/usuario/trips/trip.component';
import { PaymentDetailComponent } from './pages/usuario/payment/payment-detail.component';
import { AminBusesComponent } from './pages/admin/admin-buses/buses.component';
import { AdminEstacionesComponent } from './pages/admin/admin-estaciones/estaciones.component';
import { ViajesComponent } from './pages/admin/admin-viajes/viajes.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },//pordefecto
  { path: 'home', component: HomeComponent },//home user
  { path: 'notify', component: NotifyComponent },//notificaciones 
  { path: 'admin-user', component: AdminUsersComponent },//adminitracion de usuarios
  { path: 'reservas', component: ReservationManagementComponent },//administracion de reservas
  { path: 'reservas-limit', component: ReservationLimitComponent },//administracion de reservas limite
  { path: 'admin-dash', component: AdminDashComponent },//administracion de actividades
  { path: 'admin-viajes', component: ViajesComponent },//administracion de viajes ruta padre
  { path: 'admin-buses', component: AminBusesComponent },//administracion de buses
  { path: 'admin-estaciones', component: AdminEstacionesComponent },//administracion de buses
  { path: 'profile', component: ProfileComponent },//perfil del usuario
  { path: 'promociones-list', component: PromocionesListComponent },//lista de promociones
  { path: 'nosotros', component: NosotrosComponent },//info de nosotros
  { path: 'destinos', component: TripComponent },//lista de destinos
  { path: 'boleta', component: BoletaComponent },//boleta
  { path: 'pago-detalle', component: PaymentDetailComponent },//detalles del pago
  { path: '**', redirectTo: '/home' } // Manejo de rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
