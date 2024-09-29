import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/usuario/home/home.component';
import { NotifyComponent } from './pages/admin/notify/notify.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { ReservationManagementComponent } from './pages/admin/reservation-management/reservation-management.component';
import { AdminDashComponent } from './pages/admin/admin-dash/admin-dash.component';
import { ListTripComponent } from './pages/admin/list-trip/list-trip.component';
import { AddTripComponent } from './pages/admin/add-trip/add-trip.component';
import { EditTripComponent } from './pages/admin/edit-trip/edit-trip.component';
import { AdministratorComponent } from './pages/admin/administrator/administrator.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReservationLimitComponent } from './pages/admin/reservation-limit/reservation-limit.component';
import { NosotrosComponent } from './pages/usuario/nosotros/nosotros.component';
import { PromocionesListComponent } from './pages/usuario/promociones/promociones.component';
import { DestinosComponent } from './pages/usuario/destinos/destinos.component';
import { BoletaComponent } from './pages/usuario/boleta/boleta.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },//pordefecto
  { path: 'home', component: HomeComponent },//home user
  { path: 'notify', component: NotifyComponent },//notificaciones 
  { path: 'admin-user', component: AdminUsersComponent },//adminitracion de usuarios
  { path: 'reservas', component: ReservationManagementComponent },//administracion de reservas
  { path: 'reservas-limit', component: ReservationLimitComponent },//administracion de reservas limite
  { path: 'admin-dash', component: AdminDashComponent },//administracion de actividades
  { path: 'admin-viajes', component: ListTripComponent },//administracion de viajes ruta padre
  { path: 'add-viaje', component: AddTripComponent },//agregra destinos
  { path: 'edit-viaje', component: EditTripComponent },//edicion de destinos
  { path: 'administradores', component: AdministratorComponent },//lista, add y edit admin
  { path: 'profile', component: ProfileComponent },//perfil del usuario
  { path: 'promociones-list', component: PromocionesListComponent },//lista de promociones
  { path: 'nosotros', component: NosotrosComponent },//info de nosotros
  { path: 'destinos', component: DestinosComponent },//lista de destinos
  { path: 'boleta', component: BoletaComponent },//boleta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
