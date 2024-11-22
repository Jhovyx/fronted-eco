import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Viaje } from '../../../shared/interfaces/viaje.interface';
import { Bus } from '../../../shared/interfaces/bus.interface';
import { Estacion } from '../../../shared/interfaces/estaciones.interface';
import { ReservaService } from '../../../shared/services/reseva.service';
import { HttpClient } from '@angular/common/http';  // Asegúrate de importar HttpClient para hacer peticiones HTTP
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {

  trip: Viaje = {
    primaryKey: '',
    nombre: '',
    descripcion: '',
    costo: 0,
    idBus: '',
    idEstacionOrigen: '',
    nombreEstacionOrigen: '',
    idEstacionDestino: '',
    nombreEstacionDestino: '',
    fechaHoraSalida: 0,
    fechaHoraLlegada: 0,
    estado: true,
    statusPromo: false,
    descuentoPorcentaje: 0,
    userAdminId: '',
    urlImagen: '',
    createdAt: 0,
    updatedAt: 0
  };

  bus: Bus = {
    primaryKey: '',
    placa: '',
    modelo: '',
    capacidad: 0,
    createdAt: 0,
    updatedAt: 0,
    estado: true,
    userAdminId: ''
  };

  estacionOrigen: Estacion = { 
    primaryKey: '', 
    nombre: '', 
    ubicacion: '', 
    estado: true 
  };

  estacionDestino: Estacion = { 
    primaryKey: '', 
    nombre: '', 
    ubicacion: '', 
    estado: true 
  };

  seats: { seatId: number, isAvailable: boolean }[] = [];
  selectedSeats: number[] = [];
  user: any = null;

  constructor(private reservaService: ReservaService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const selectedTrip = sessionStorage.getItem('selectedTrip');
    if (selectedTrip) {
      this.trip = JSON.parse(selectedTrip);
      this.loadBusAndStations();
    }
  
    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    // Cargar la capacidad del bus desde sessionStorage
  const storedCapacity = sessionStorage.getItem('bus-capacidad');
  if (storedCapacity) {
    this.bus.capacidad = JSON.parse(storedCapacity);
  }
  }

  loadBusAndStations(): void {
    this.http.get<Bus>(`http://localhost:3000/v1/buses/${this.trip.idBus}`).subscribe((busData) => {
      this.bus = busData;
      this.loadSeats(); // Cargar los asientos después de obtener los datos del bus
    });

    this.http.get<Estacion>(`http://localhost:3000/v1/estaciones/${this.trip.idEstacionOrigen}`).subscribe((estacionData) => {
      this.estacionOrigen = estacionData;
      this.trip.nombreEstacionOrigen = estacionData.nombre; 
    });

    this.http.get<Estacion>(`http://localhost:3000/v1/estaciones/${this.trip.idEstacionDestino}`).subscribe((estacionData) => {
      this.estacionDestino = estacionData;
      this.trip.nombreEstacionDestino = estacionData.nombre; 
    });
  }

  loadSeats(): void {
    this.seats = [];
    if (this.bus.capacidad > 0) {
      for (let i = 1; i <= this.bus.capacidad; i++) {
        const seatStatus = sessionStorage.getItem(`seat-${this.bus.primaryKey}-${i}`);
        const isAvailable = seatStatus ? JSON.parse(seatStatus).isAvailable : true;
        this.seats.push({
          seatId: i,
          isAvailable: isAvailable
        });
      }
    }
  }
  loadSeatsFromStorage(): void {
    const savedSeats = sessionStorage.getItem('selectedSeats');
    if (savedSeats) {
      this.selectedSeats = JSON.parse(savedSeats);
      this.updateSeatStatus();
    }
  }

  // Método para mostrar el modal con los detalles del viaje
  showTripDetails(): void {
    const modalElement = document.getElementById('tripDetailsModal');
    if (modalElement) {  // Verificamos que el elemento no sea null
      const tripDetailsModal = new bootstrap.Modal(modalElement);
      tripDetailsModal.show();
    } else {
      console.error('No se encontró el modal con el id tripDetailsModal');
    }
  }
  selectSeat(seatId: number): void {
    if (!this.selectedSeats.includes(seatId)) {
      this.selectedSeats.push(seatId);
    } else {
      this.selectedSeats = this.selectedSeats.filter(seat => seat !== seatId);
    }
    this.updateSeatStatus();
  }

  updateSeatStatus(): void {
    this.seats.forEach(seat => {
      seat.isAvailable = !this.selectedSeats.includes(seat.seatId);
    });
  }
  saveSeatSelection(): void {
    sessionStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));
    alert('Selección de asientos guardada!');
  }

  confirmSeatSelection(): void {
    const selectedSeatsCount = this.selectedSeats.length;
    // Reducir la capacidad del bus
    this.bus.capacidad -= selectedSeatsCount;
    sessionStorage.setItem('bus-capacidad', JSON.stringify(this.bus.capacidad));
  
    this.selectedSeats.forEach(seatId => {
      const seat = this.seats.find(s => s.seatId === seatId);
      if (seat) {
        seat.isAvailable = false;
        sessionStorage.setItem(`seat-${this.bus.primaryKey}-${seatId}`, JSON.stringify({ isAvailable: false }));
      }
    });
  
    // Cerrar el modal de selección de asientos
    const seatModalElement = document.getElementById('seatSelectionModal');
    if (seatModalElement) {
      const seatModal = new bootstrap.Modal(seatModalElement);
      seatModal.hide();
    }
  
    // Actualizar el modal de detalles para mostrar la nueva capacidad
    this.loadSeats();
  }
  



  reserveXd(): void {
    if (!this.user) {
      const loginModalElement = document.getElementById('loginModal');
      if (loginModalElement) {
        const loginModal = new bootstrap.Modal(loginModalElement);
        loginModal.show();
      }
    } else {
      this.reservaService.setTrip(this.trip);
      this.reservaService.setUser(this.user);

      const reservaModalElement = document.getElementById('tripModall');
      if (reservaModalElement) {
        const reservaModal = new bootstrap.Modal(reservaModalElement);
        reservaModal.show();
      }
    }
  }
}
