import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// User Components
import { HomeComponent } from './pages/usuario/home/home.component';
import { NosotrosComponent } from './pages/usuario/nosotros/nosotros.component';
import { TripComponent } from './pages/usuario/trips/trip.component';
import { BoletaComponent } from './pages/usuario/boleta/boleta.component';
import { PaymentDetailComponent } from './pages/usuario/payment/payment-detail.component';
import { AsientosComponent } from './pages/usuario/asientos/asientos.component';

// Admin Components
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminDashComponent } from './pages/admin/admin-dash/admin-dash.component';
import { AminBusesComponent } from './pages/admin/admin-buses/buses.component';
import { AdminEstacionesComponent } from './pages/admin/admin-estaciones/estaciones.component';
import { ViajesComponent } from './pages/admin/admin-viajes/viajes.component';
import { ReservationManagementComponent } from './pages/admin/reserva-management/reserva-management.component';

// Guards
import { adminGuard } from './guards/admin.guard';
import { clienteGuard } from './guards/cliente.guard';
import { clienteNoAuthGuard } from './guards/cliente-no-auth.guard';
import { adminClienteGuard } from './guards/admin-cliente.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReservaComponent } from './pages/usuario/reserva/reserva.component';

const routes: Routes = [
  // Default route
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Public Routes (no authentication needed)
  { path: 'home', component: HomeComponent, canActivate: [clienteNoAuthGuard] }, // Home for unauthenticated users
  { path: 'nosotros', component: NosotrosComponent, canActivate: [clienteNoAuthGuard] }, // About Us
  { path: 'destinos', component: TripComponent, canActivate: [clienteNoAuthGuard] }, // Destinations list

  // Admin Routes (only accessible by authenticated admins)
  { path: 'admin-user', component: AdminUsersComponent, canActivate: [adminGuard] }, // Admin User Management
  { path: 'admin-dash', component: AdminDashComponent, canActivate: [adminGuard] }, // Admin Dashboard
  { path: 'admin-viajes', component: ViajesComponent, canActivate: [adminGuard] }, // Travel Management
  { path: 'admin-buses', component: AminBusesComponent, canActivate: [adminGuard] }, // Bus Management
  { path: 'admin-estaciones', component: AdminEstacionesComponent, canActivate: [adminGuard] }, // Station Management

  // Client Routes (only accessible by authenticated clients)
  { path: 'profile', component: ProfileComponent, canActivate: [clienteGuard] }, // User Profile
  { path: 'pago-detalle', component: PaymentDetailComponent }, // Payment Details
  { path: 'boleta', component: BoletaComponent, canActivate: [clienteGuard] }, // Ticket (Boleta)
  { path: 'asientos', component: AsientosComponent, canActivate: [clienteGuard] }, // Seat selection form

  // Routes accessible by both Admin and Client (shared roles)
  { path: 'reservas', component: ReservationManagementComponent, canActivate: [adminClienteGuard] }, // Reservation Management
  { path: 'reserva', component: ReservaComponent, canActivate: [adminClienteGuard] }, // Reservation 

  // Catch-all route for undefined paths
  { path: '**', redirectTo: '/home' } // Redirect to home for any invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
