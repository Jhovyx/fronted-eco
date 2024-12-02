import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// User Components
import { HomeComponent } from './pages/usuario/home/home.component';
import { NosotrosComponent } from './pages/usuario/nosotros/nosotros.component';
import { PromocionesListComponent } from './pages/usuario/promociones/promociones.component';
import { TripComponent } from './pages/usuario/trips/trip.component';
import { BoletaComponent } from './pages/usuario/boleta/boleta.component';
import { TripDetailComponent } from './pages/usuario/trip-details/trip-detail.component';
import { PaymentDetailComponent } from './pages/usuario/payment/payment-detail.component';
import { AsientosComponent } from './pages/usuario/asientos/asientos.component';

// Admin Components
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { NotifyComponent } from './pages/admin/notify/notify.component';
import { ReservationManagementComponent } from './pages/admin/reservation-management/reservation-management.component';
import { AdminDashComponent } from './pages/admin/admin-dash/admin-dash.component';
import { ReservationLimitComponent } from './pages/admin/reservation-limit/reservation-limit.component';
import { AminBusesComponent } from './pages/admin/admin-buses/buses.component';
import { AdminEstacionesComponent } from './pages/admin/admin-estaciones/estaciones.component';
import { ViajesComponent } from './pages/admin/admin-viajes/viajes.component';

// Guards
import { adminGuard } from './guards/admin.guard';
import { clienteGuard } from './guards/cliente.guard';
import { clienteNoAuthGuard } from './guards/cliente-no-auth.guard';
import { adminClienteGuard } from './guards/admin-cliente.guard';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  // Default route
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Public Routes (no authentication needed)
  { path: 'home', component: HomeComponent, canActivate: [clienteNoAuthGuard] }, // Home for unauthenticated users
  { path: 'nosotros', component: NosotrosComponent, canActivate: [clienteNoAuthGuard] }, // About Us
  { path: 'destinos', component: TripComponent, canActivate: [clienteNoAuthGuard] }, // Destinations list
  { path: 'promociones-list', component: PromocionesListComponent, canActivate: [clienteNoAuthGuard] }, // Promotions

  // Admin Routes (only accessible by authenticated admins)
  { path: 'admin-user', component: AdminUsersComponent, canActivate: [adminGuard] }, // Admin User Management
  { path: 'admin-dash', component: AdminDashComponent, canActivate: [adminGuard] }, // Admin Dashboard
  { path: 'admin-viajes', component: ViajesComponent, canActivate: [adminGuard] }, // Travel Management
  { path: 'admin-buses', component: AminBusesComponent, canActivate: [adminGuard] }, // Bus Management
  { path: 'admin-estaciones', component: AdminEstacionesComponent, canActivate: [adminGuard] }, // Station Management

  // Client Routes (only accessible by authenticated clients)
  { path: 'profile', component: ProfileComponent, canActivate: [clienteGuard] }, // User Profile
  { path: 'pago-detalle', component: PaymentDetailComponent, canActivate: [clienteGuard] }, // Payment Details
  { path: 'trip-detail', component: TripDetailComponent, canActivate: [clienteGuard] }, // Trip Details
  { path: 'boleta', component: BoletaComponent, canActivate: [clienteGuard] }, // Ticket (Boleta)
  { path: 'asientos', component: AsientosComponent, canActivate: [clienteGuard] }, // Seat selection form

  // Routes accessible by both Admin and Client (shared roles)
  { path: 'notify', component: NotifyComponent, canActivate: [adminClienteGuard] }, // Notifications
  { path: 'reservas', component: ReservationManagementComponent, canActivate: [adminClienteGuard] }, // Reservation Management
  { path: 'reservas-limit', component: ReservationLimitComponent, canActivate: [adminClienteGuard] }, // Reservation Limit Management

  // Catch-all route for undefined paths
  { path: '**', redirectTo: '/home' } // Redirect to home for any invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
