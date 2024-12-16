import { Component, OnInit } from "@angular/core";
import { EstadoReserva, Reserva } from "../../../shared/interfaces/reserva.interface";
import { ReservaService } from "../../../shared/services/reseva.service";
import { Router } from "@angular/router";
import { UserService } from "../../../shared/services/user.service";
import { User } from "../../../shared/interfaces/user.interface";
import { ViajesService } from "../../../shared/services/viajes.service";
declare var bootstrap: any;


@Component({
  selector: 'app-reserva-management',
  templateUrl: './reserva-management.component.html',
  styleUrls: ['./reserva-management.component.css']
})
export class ReservationManagementComponent implements OnInit {

  user!: User
  userRol!: string
  reserva: Reserva = {idUsuario: '',pasajeros: [],idViaje: '',estado: EstadoReserva.CONFIRMADA,fechaViaje: 0,}

  ngOnInit(): void {
    this.loadUser();
  }

  constructor(private viajesService: ViajesService, private reservasService: ReservaService, private router: Router, private userService: UserService) {}

  reservas: Reserva[] = [];

  async loadReservasBiUser(id: string) {
    const reservas = await this.reservasService.findByIdUser(id);
    if (reservas) {
      this.reservas = await Promise.all(
        reservas.map(async reserva => ({
          ...reserva,
          viajeNombre: (await this.viajesService.findById(reserva.idViaje))?.nombre || 'Desconocido',
        }))
      );
    }
  }
  
  async loadReservas() {
    const reservas = await this.reservasService.findAll();
    if (reservas) {
      this.reservas = await Promise.all(
        reservas.map(async reserva => ({
          ...reserva,
          viajeNombre: (await this.viajesService.findById(reserva.idViaje))?.nombre || 'Desconocido',
        }))
      );
    }
  }

  detail(reserva: Reserva){
    this.reserva = reserva
    const loginModalElement = document.getElementById('modalDetailReserve');
    if (loginModalElement) {
      const loginModal = new bootstrap.Modal(loginModalElement);
      loginModal.show();
    }
  }
  

  loadUser(){
    const user = this.userService.getCookie('user');
    if(user){
      this.user = user;
      this.userRol = this.user.userType!
      if(user.userType === 'admin'){
        this.loadReservas();
      }else{
        this.loadReservasBiUser(this.user.primaryKey)
      }
    }
  }

  async loadViaje(id: string) {
    const viaje = await this.viajesService.findById(id);
    if(viaje){
      return viaje.nombre
    }
    return
  }

  pagar(reserva: Reserva){
    sessionStorage.setItem('reserva', JSON.stringify(reserva));
    this.router.navigate(['/pago-detalle']);
  }

  async camcelar(reserva: Reserva) {
    if(reserva.primaryKey){
      const response = await this.reservasService.update(reserva.primaryKey, reserva);
      if(response && typeof response === 'object' && response.primaryKey){
        this.showCustomAlert('Se cancelo correctamete.', 'success');
        this.loadUser();
      }else{
        this.showCustomAlert('Error al cancelar la reserva.', "error");
      }
    }
  }

  // Alerta de error o éxito
  showCustomAlert(message: string, type: 'success' | 'error') {
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '50%';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translate(-50%, -50%)';
    alertDiv.style.padding = '20px';
    alertDiv.style.zIndex = '1055';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.color = '#fff';
    alertDiv.style.fontSize = '16px';
    alertDiv.style.textAlign = 'center';
    alertDiv.style.minWidth = '300px';
    alertDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    alertDiv.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.remove();
    }, 1500);
  }
}
