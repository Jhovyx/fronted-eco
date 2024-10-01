import { Component } from "@angular/core";
import { Trip } from "../../../shared/interfaces/trip.interface";
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})

export class TripDetailComponet  {
  
  trip: Trip = {
    id: 0,
    imagen: '',
    descripcion: '',
    nombre: '',
    costo: 0,
    fechaInicio: '',
    fechaFin: '',
    nombreBus: '',
    placaBus: '',
    ubicacionBus: '',
    asientosDisponibles: 0
  }
  detailReserva: boolean = false
  UpdateSElectTrip(tripxd: Trip): Trip{
    this.detailReserva = false
    return this.trip = tripxd
  }
  TougleReservaDetail(){
    this.detailReserva = !this.detailReserva
  }

  reserveXd(trip: Trip){
    const loginModalElement = document.getElementById('tripDetailModall');
    if (loginModalElement) {
      // hacer click en el btn de cerraar modal
      const closeButton = document.getElementById('closeButtonres');
      if (closeButton) {
        closeButton.click(); // Simula un clic en el botón de cerrar
      }
    }
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      // Mostrar el modal de inicio de sesión
      const loginModalElement = document.getElementById('loginModal');
      if (loginModalElement) {
        //enviar peticion al nabvar
        const loginModal = new bootstrap.Modal(loginModalElement);
        loginModal.show();
      }
    }else{
      // Mostrar el modal de reserva
      const reservaModalElement = document.getElementById('tripModall');
      if (reservaModalElement) {
        //enviar peticion al nabvar
        const reservaModal = new bootstrap.Modal(reservaModalElement);
        reservaModal.show();
      }
    }
  }
  
}
