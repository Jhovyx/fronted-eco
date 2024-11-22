import { Injectable } from '@angular/core';
import { Viaje } from '../interfaces/viaje.interface';
import { Bus } from '../interfaces/bus.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private trip: Viaje | null = null;
  private user: any = null;
  
  // Este objeto almacenará la disponibilidad de asientos para cada bus
  private busesSeats: { [busId: string]: { seatId: number, isAvailable: boolean }[] } = {};

  constructor() {}

  // Método para configurar el viaje
  setTrip(trip: Viaje) {
    this.trip = trip;
    // Inicializamos los asientos del bus cuando se selecciona un viaje
    if (trip.idBus) {
      this.initializeSeats(trip.idBus);
    }
  }

  // Método para obtener el viaje
  getTrip(): Viaje | null {
    return this.trip;
  }

  // Método para configurar el usuario
  setUser(user: any) {
    this.user = user;
  }

  // Método para obtener el usuario
  getUser(): any {
    return this.user;
  }

  // Método para limpiar el estado (reserva y usuario)
  clear() {
    this.trip = null;
    this.user = null;
    this.busesSeats = {};  // Limpiar los asientos cuando se desee limpiar la reserva
  }

  // Inicializar los asientos para un bus dado
  initializeSeats(busId: string) {
    // Buscamos el bus por su ID desde el sessionStorage
    const bus = this.getBusById(busId);
  
    if (bus && bus.capacidad) {
      const seats = [];
      for (let i = 1; i <= bus.capacidad; i++) {
        seats.push({
          seatId: i,
          isAvailable: true  // Asume que todos los asientos están disponibles por defecto
        });
      }
  
      this.busesSeats[busId] = seats;  // Guardamos los asientos en el servicio
    } else {
      console.warn(`No se encontró el bus con ID ${busId} o la capacidad no está definida.`);
    }
  }
  
  // Obtener el bus por su ID desde el sessionStorage
  private getBusById(busId: string): Bus | undefined {
    const busesString = sessionStorage.getItem('buses');
    if (busesString) {
      const buses: Bus[] = JSON.parse(busesString);
      return buses.find(bus => bus.primaryKey === busId);
    }
    return undefined;
  }

  // Obtener los asientos del bus seleccionado
  getSeats(busId: string): { seatId: number, isAvailable: boolean }[] {
    return this.busesSeats[busId] || [];
  }

  // Reservar un asiento
  reserveSeat(busId: string, seatId: number, user: any): boolean {
    const seats = this.busesSeats[busId];
    const seat = seats ? seats.find(s => s.seatId === seatId) : null;
    if (seat && seat.isAvailable) {
      seat.isAvailable = false;  // El asiento ya no está disponible
      return true;  // Reserva exitosa
    }
    return false;  // Si el asiento ya está reservado o no existe
  }

  // Cancelar la reserva de un asiento
  cancelSeatReservation(busId: string, seatId: number): boolean {
    const seats = this.busesSeats[busId];
    const seat = seats ? seats.find(s => s.seatId === seatId) : null;
    if (seat && !seat.isAvailable) {
      seat.isAvailable = true;  // El asiento vuelve a estar disponible
      return true;  // Cancelación exitosa
    }
    return false;  // Si el asiento no está reservado o no existe
  }
}
