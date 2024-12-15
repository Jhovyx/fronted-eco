import { Component, OnInit } from "@angular/core";
import { Viaje } from "../../../shared/interfaces/viaje.interface";
import { ViajesService } from "../../../shared/services/viajes.service";
import { Router } from "@angular/router";
import { UserService } from "../../../shared/services/user.service";
import { User } from "../../../shared/interfaces/user.interface";
import { Bus } from "../../../shared/interfaces/bus.interface";
import { Estacion } from "../../../shared/interfaces/estaciones.interface";
import { EstacionService } from "../../../shared/services/estaciones.service";
import { BusService } from "../../../shared/services/buses.service";
import { AsientoService } from "../../../shared/services/asientos.service";
import { Asiento, EstadoAsiento } from "../../../shared/interfaces/asiento.interface";
import { WebSocketService } from "../../../shared/services/websocket.service";

declare var bootstrap: any;

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  viajes: Viaje[] = [];
  asientos: Asiento[] = [];
  user!: User;
  
  trip: Viaje = {primaryKey: '',nombre: '',descripcion: '',costo: 0,idBus: '',idEstacionOrigen: '',nombreEstacionOrigen: '',idEstacionDestino: '',nombreEstacionDestino: '',fechaHoraSalida: 0,fechaHoraLlegada: 0,estado: true,statusPromo: false,descuentoPorcentaje: 0,userAdminId: '',urlImagen: '',createdAt: 0,updatedAt: 0};
  
  bus: Bus = {primaryKey: '',placa: '',modelo: '',capacidad: 0,createdAt: 0,updatedAt: 0,estado: true,userAdminId: ''};
  asientoVacio: Asiento = {primaryKey: '',numero: 0,idBus: '',userAdminId: '',estado: EstadoAsiento.DISPONIBLE,createdAt: 0,};
  
  estacionOrigen: Estacion = { primaryKey: '', nombre: '', ubicacion: '', estado: true };
  estacionDestino: Estacion = { primaryKey: '', nombre: '', ubicacion: '', estado: true };

  hayDisponibles: boolean = false;

  constructor(
    private router: Router,
    private viajeService: ViajesService,
    private userservice: UserService,
    private estacionService: EstacionService,
    private busService: BusService,
    private asientoService: AsientoService,
    private websocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.loadViajes();
    this.loadUserData();
    // Suscribirse a los cambios de WebSocke
    this.websocketService.listenAsientoActualizado().subscribe((asiento: Asiento) => {
      this.updateAsiento(asiento);
    });
  }

  // Actualiza el asiento en el frontend
  private updateAsiento(asientoActualizado: Asiento): void {
    const index = this.asientos.findIndex(asiento => asiento.primaryKey === asientoActualizado.primaryKey);
    if (index !== -1) {
      this.asientos[index] = asientoActualizado;
    }
  }

  checkDisponibilidad() {
    // Verificamos si hay algún asiento disponible
    this.hayDisponibles = this.asientos.some(asiento => asiento.estado === 'DISPONIBLE');
  }

  async openTripDetails(trip: Viaje) {
    const estacionOrigen = await this.loadEstacion(trip.idEstacionOrigen);
    const estacionDestino = await this.loadEstacion(trip.idEstacionDestino);
    if(estacionOrigen) this.estacionOrigen = estacionOrigen
    if(estacionDestino) this.estacionDestino = estacionDestino
    await this.loadBus(trip.idBus);
    await this.loadAsientos(trip.idBus);
    this.trip = trip
    this.checkDisponibilidad();
    const registerModalElement = document.getElementById('tripModal');
    if (registerModalElement) {
      const registerModal = new bootstrap.Modal(registerModalElement);
      registerModal.show();
    }
  }

  btnReserveIr(){
    this.onReserve(this.trip);
  }

  onReserve(trip: Viaje) {
    this.loadUserData();
    if(!this.user){
      const closeRegisterButton = document.getElementById('closeTripxdModal');
      if (closeRegisterButton) {
        closeRegisterButton.click();
      }
      const loginModalElement = document.getElementById('loginModal');
      if (loginModalElement) {
        const loginModal = new bootstrap.Modal(loginModalElement);
        loginModal.show();
      }
    }else{
      sessionStorage.setItem('trip', JSON.stringify(trip));
      const closeRegisterButton = document.getElementById('closeTripxdModal');
      if (closeRegisterButton) {
        closeRegisterButton.click();
      }
      this.router.navigate(['/reserva'])
    }
  }

  // Cargar viajes desde el servicio
  async loadViajes() {
    const data = await this.viajeService.findAllTrue();
    this.viajes = data ?? [];
  }

  //cargar estacion
  async loadEstacion(id: string) {
    const estacion = await this.estacionService.findById(id);
    if(estacion){
      return estacion
    }
    return
  }

  //cargar bus
  async loadBus(id: string) {
    const bus = await this.busService.findById(id)
    if(bus){
      this.bus = bus 
    }
    return
  }

  //cargar asientos del bus
  async loadAsientos(idBus: string) {
    const data = await this.asientoService.findById(idBus);
    this.asientos = data ?? [];
  }

  // cargar usuario
  private loadUserData(): void {
    const user = this.userservice.getCookie('user');
    if (user) {
      this.user = user;
    }
  }

  //formatear la fecha
  public formatDate(unixTimestamp: number) {
    return this.userservice.formatDate(unixTimestamp);
  }
}
