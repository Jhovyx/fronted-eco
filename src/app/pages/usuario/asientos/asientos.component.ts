import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asiento } from '../../../shared/interfaces/asiento.interface';
import { UserService } from '../../../shared/services/user.service';
import { Pasajero } from '../../../shared/interfaces/pasajero.interface';
import { EstadoReserva, Reserva } from '../../../shared/interfaces/reserva.interface';
import { User } from '../../../shared/interfaces/user.interface';
import { Viaje } from '../../../shared/interfaces/viaje.interface';
import { ReservaService } from '../../../shared/services/reseva.service';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css']
})
export class AsientosComponent implements OnInit {

  currentPassengerIndex = 0;
  asientos: Asiento[] = [];
  pasajeros: Pasajero[] = [];
  reserva: Reserva = {idUsuario: '',pasajeros: [],idViaje: '',estado: EstadoReserva.PENDIENTE,fechaViaje: 0,}

  constructor(
    private userService: UserService,
    private reservaService: ReservaService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadAsientos();
    this.loadUser();
    this.loadTrip();
  }

  loadUser() {
    const user = this.userService.getCookie('user');
    if(user){
      this.reserva.idUsuario = user.primaryKey
    }
  }

  loadTrip() {
    const data = sessionStorage.getItem('trip');
    if(data){
      let tripxd: Viaje = JSON.parse(data);
      this.reserva.idViaje = tripxd.primaryKey!;
      this.reserva.fechaViaje = tripxd.fechaHoraSalida!;
      this.reserva.costoUnitario = tripxd.costo;
      this.reserva.descuentoPorcentaje = tripxd.descuentoPorcentaje || 0; // Asigna el descuento 
    }
  }

  //CARGAR ASIENTOS
  loadAsientos() {
    const data = sessionStorage.getItem('asientosSeleccionados');
    if (data) {
      this.asientos = JSON.parse(data);
      // Inicializar el arreglo de pasajeros con el mismo número de asientos
      this.pasajeros = this.asientos.map(() => ({firstName: '', registered: false,lastName: '',documentType: '',documentNumber: '',phoneNumber: '',email: '',idAsiento: ''}));
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

    nextPassenger() {
      if (this.currentPassengerIndex < this.pasajeros.length - 1) {
        this.currentPassengerIndex++;
      }
    }
  
    previousPassenger() {
      if (this.currentPassengerIndex > 0) {
        this.currentPassengerIndex--;
      }
    }

    registerPassenger(index: number): void {
      const passenger = this.pasajeros[index];
    
      // Verificamos si los datos del pasajero son válidos
      if (passenger.firstName && passenger.lastName && passenger.documentType && passenger.documentNumber && passenger.phoneNumber && passenger.email) {
        // Asignar el idAsiento correspondiente al pasajero
        passenger.idAsiento = this.asientos[index].primaryKey; // Asumiendo que los asientos tienen una propiedad `idAsiento`
    
        // Eliminar el pasajero de la reserva si ya está registrado
        const passengerIndexInReserva = this.reserva.pasajeros.findIndex(p => p.idAsiento === passenger.idAsiento);
        if (passengerIndexInReserva !== -1) {
          // Si lo encuentra, lo elimina de la lista de pasajeros
          this.reserva.pasajeros.splice(passengerIndexInReserva, 1);
          this.reserva.pasajeros.push(passenger);
          this.calculateTotalCost();
          this.showCustomAlert('Datos del pasajero actualizados correctamente', 'success');
        }else{
          // Agregar nuevamente el pasajero (ya sea para actualizar o registrar)
          passenger.registered = true; // Marca al pasajero como registrado
          this.reserva.pasajeros.push(passenger); // Agrega el pasajero al arreglo de pasajeros de la reserva, usando una copia para evitar cambios en la referencia
          this.calculateTotalCost();
	  this.showCustomAlert('Pasajero registrado exitosamente', 'success');
        }

      } else {
        this.showCustomAlert('Por favor, completa todos los campos', 'error');
      }
    }
    
 
    isPassengerRegistered(index: number): boolean {
      return this.pasajeros[index]?.registered || false;
    }
    
    areAllPassengersRegistered(): boolean {
      return this.pasajeros.every(pasajero => this.isPassengerRegistered(this.pasajeros.indexOf(pasajero)));
    }

    async reserveSeats() {
      // Lógica para realizar la reserva
      const response = await this.reservaService.create(this.reserva);
      if(response && typeof response === 'object' && response.primaryKey){
        this.showCustomAlert('Se creo correctamente el Bus.', 'success');
        this.router.navigate(['/reservas']);
      }else{
        this.showCustomAlert('Error al crear el Bus.', "error");
      }
    }

calculateTotalCost() {
  if (this.reserva.costoUnitario && this.reserva.pasajeros.length > 0) {
    const subtotal = this.reserva.costoUnitario * this.reserva.pasajeros.length;
    const descuento = (subtotal * (this.reserva.descuentoPorcentaje || 0)) / 100;
    this.reserva.costoTotal = subtotal - descuento;
  } else {
    this.reserva.costoTotal = 0;
  }
}

}
