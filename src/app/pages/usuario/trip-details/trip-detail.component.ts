import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../shared/services/reseva.service';
import { Router } from '@angular/router';

import { Viaje } from '../../../shared/interfaces/viaje.interface';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {

  // Asegúrate de que 'trip' sea de tipo 'Viaje'
  trip: Viaje = {
    primaryKey: '', // Asegúrate de asignar un valor o dejarlo vacío
    nombre: '',
    descripcion: '',
    costo: 0,
    idBus: '',
    idEstacionOrigen: '',
    idEstacionDestino: '',
    fechaHoraSalida: 0,
    fechaHoraLlegada: 0,
    estado: true,
    statusPromo: false,
    descuentoPorcentaje: 0,
    userAdminId: '',
    urlImagen: '',  // Este campo debe existir y estar correctamente asignado
    createdAt: 0,
    updatedAt: 0
  };

  user: any = null;

  constructor(private reservaService: ReservaService, private router: Router) {}

  ngOnInit(): void {
    const selectedTrip = sessionStorage.getItem('selectedTrip');
    if (selectedTrip) {
      this.trip = JSON.parse(selectedTrip); // Asegúrate de que el objeto en sessionStorage esté bien estructurado
    }

    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  reserveXd(): void {
    if (!this.user) {
      const loginModalElement = document.getElementById('loginModal');
      if (loginModalElement) {
        const loginModal = new bootstrap.Modal(loginModalElement);
        loginModal.show();
      } else {
        console.error('No se encontró el modal de inicio de sesión');
      }
    } else {
      this.reservaService.setTrip(this.trip);  // Aquí se pasa el objeto 'trip' que es de tipo 'Viaje'
      this.reservaService.setUser(this.user);
  
      const reservaModalElement = document.getElementById('tripModall');
      if (reservaModalElement) {
        const reservaModal = new bootstrap.Modal(reservaModalElement);
        reservaModal.show();
      } else {
        console.error('No se encontró el modal de reserva');
      }
    }
  }
}
