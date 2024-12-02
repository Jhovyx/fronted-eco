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
import { TripDetailComponent } from './pages/usuario/trip-details/trip-detail.component';
import { adminGuard } from './guards/admin.guard';
import { clienteNoAuthGuard } from './guards/cliente-no-auth.guard';
import { clienteGuard } from './guards/cliente.guard';
import { adminClienteGuard } from './guards/admin-cliente.guard';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full'},//pordefecto
  
  //DONT` AUTH AND CLIENT
  { path: 'home', component: HomeComponent, canActivate: [clienteNoAuthGuard] },//home user
  { path: 'nosotros', component: NosotrosComponent, canActivate: [clienteNoAuthGuard] },//info de nosotros
  { path: 'destinos', component: TripComponent, canActivate: [clienteNoAuthGuard] },//lista de destinos
  { path: 'promociones-list', component: PromocionesListComponent, canActivate: [clienteNoAuthGuard] },//lista de promociones
  
  //ADMIN ROUTES
  { path: 'admin-user', component: AdminUsersComponent, canActivate: [adminGuard] },//adminitracion de usuarios
  { path: 'admin-dash', component: AdminDashComponent, canActivate: [adminGuard] },//administracion de actividades
  { path: 'admin-viajes', component: ViajesComponent, canActivate: [adminGuard] },//administracion de viajes ruta padre
  { path: 'admin-buses', component: AminBusesComponent, canActivate: [adminGuard] },//administracion de buses
  { path: 'admin-estaciones', component: AdminEstacionesComponent, canActivate: [adminGuard] },//administracion de buses
  
  //CLIENT ROUTES
  { path: 'pago-detalle', component: PaymentDetailComponent, canActivate: [clienteGuard] },//detalles del pago
  { path: 'trip-detail', component: TripDetailComponent, canActivate: [clienteGuard] },

  //ADMIN AND CLIENT
  { path: 'notify', component: NotifyComponent, canActivate: [adminClienteGuard] },//notificaciones 
  { path: 'reservas', component: ReservationManagementComponent, canActivate: [adminClienteGuard] },//administracion de reservas
  { path: 'reservas-limit', component: ReservationLimitComponent, canActivate: [adminClienteGuard] },//administracion de reservas limite
  { path: 'profile', component: ProfileComponent, canActivate: [adminClienteGuard] },//perfil del usuario
  { path: 'boleta', component: BoletaComponent, canActivate: [adminClienteGuard] },//boleta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
