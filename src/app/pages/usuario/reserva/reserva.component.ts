import { Component, OnInit } from "@angular/core";
import { Viaje } from "../../../shared/interfaces/viaje.interface";
import { UserService } from "../../../shared/services/user.service";
import { User } from "../../../shared/interfaces/user.interface";
import { Bus } from "../../../shared/interfaces/bus.interface";
import { Estacion } from "../../../shared/interfaces/estaciones.interface";
import { EstacionService } from "../../../shared/services/estaciones.service";
import { BusService } from "../../../shared/services/buses.service";
import { AsientoService } from "../../../shared/services/asientos.service";
import { Asiento, EstadoAsiento } from "../../../shared/interfaces/asiento.interface";
import { WebSocketService } from "../../../shared/services/websocket.service";
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  asientos: Asiento[] = [];
  user: User = {
    primaryKey: '',
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    documentNumber: '',
    documentType: '',
    phoneNumber: '',
    password: '',
    profilePictureUrl: '',
    createdAt: 0,
    updatedAt: 0,
    estado: false
  };

  trip: Viaje = {primaryKey: '',nombre: '',descripcion: '',costo: 0,idBus: '',idEstacionOrigen: '',nombreEstacionOrigen: '',idEstacionDestino: '',nombreEstacionDestino: '',fechaHoraSalida: 0,fechaHoraLlegada: 0,estado: true,statusPromo: false,descuentoPorcentaje: 0,userAdminId: '',urlImagen: '',createdAt: 0,updatedAt: 0};
  
  bus: Bus = {primaryKey: '',placa: '',modelo: '',capacidad: 0,createdAt: 0,updatedAt: 0,estado: true,userAdminId: ''};
  asientoVacio: Asiento = {primaryKey: '',numero: 0,idBus: '',userAdminId: '',estado: EstadoAsiento.DISPONIBLE,createdAt: 0,};
  
  estacionOrigen: Estacion = { primaryKey: '', nombre: '', ubicacion: '', estado: true };
  estacionDestino: Estacion = { primaryKey: '', nombre: '', ubicacion: '', estado: true };

  hayDisponibles: boolean = false;
  asientosSeleccionados: number[] = [];

  constructor(
    private userservice: UserService,
    private estacionService: EstacionService,
    private busService: BusService,
    private asientoService: AsientoService,
    private websocketService: WebSocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadTrip();
    this.Details(this.trip);

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

  async Details(trip: Viaje) {
    const estacionOrigen = await this.loadEstacion(trip.idEstacionOrigen);
    const estacionDestino = await this.loadEstacion(trip.idEstacionDestino);
    if(estacionOrigen) this.estacionOrigen = estacionOrigen
    if(estacionDestino) this.estacionDestino = estacionDestino
    await this.loadBus(trip.idBus);
    await this.loadAsientos(trip.idBus);
    this.trip = trip
    this.checkDisponibilidad();
  }

  loadTrip() {
    const trip = sessionStorage.getItem('trip');
    if(trip){
      this.trip = JSON.parse(trip);
    }
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

    // Cargar los asientos seleccionados
    this.asientosSeleccionados = this.asientos
    .filter(asiento => asiento.estado === EstadoAsiento.SELECCIONADO && asiento.reservadoPor === this.user.primaryKey)
    .map(asiento => asiento.numero);
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

  checkDisponibilidad() {
    // Verificamos si hay algún asiento disponible
    this.hayDisponibles = this.asientos.some(asiento => asiento.estado === 'DISPONIBLE');
  }

  // Seleccionar o deseleccionar un asiento
  toggleAsiento(asiento: Asiento) {

    if (asiento.estado === 'RESERVADO') {
      this.showCustomAlert('Este asiento ya está reservado por otro usuario.', 'error');
      return;
    }

    // Si el asiento está seleccionado por otro usuario
    if (asiento.estado === 'SELECCIONADO' && asiento.reservadoPor !== this.user.primaryKey) {
      this.showCustomAlert('Este asiento ya está seleccionado por otro usuario.', 'error');
      return;
    }

    // Si el asiento está disponible
    if (asiento.estado === 'DISPONIBLE' ||  asiento.estado === 'SELECCIONADO') {
      // Si ya está seleccionado, lo deseleccionamos
      if (this.asientosSeleccionados.includes(asiento.numero)) {
        this.asientosSeleccionados = this.asientosSeleccionados.filter(num => num !== asiento.numero);
        this.desSelect(asiento);
      } else {
        // Si no está seleccionado, lo seleccionamos
        this.asientosSeleccionados.push(asiento.numero);
        this.onSelect(asiento);
      }
    }
  }

  // Reservar los asientos seleccionados
  reservarAsientos() {

    const asientosReservados = this.asientosSeleccionados
    .map(numero => this.asientos.find(asiento => 
      asiento.numero === numero && asiento.idBus === this.bus.primaryKey // Verifica la relación con el autobús
    ));

    // Guardar en sessionStorage
    sessionStorage.setItem('asientosSeleccionados', JSON.stringify(asientosReservados));

    this.router.navigate(['/asientos']);
  }


  // Verificar si el asiento está reservado por otro usuario
  isAsientoReservedByOther(asiento: Asiento): boolean {
    return asiento.estado === 'RESERVADO' && asiento.reservadoPor !== this.user.primaryKey;
  }

  // Verificar si el botón debe estar habilitado
  isBotonReservarDisabled(): boolean {
    return this.asientosSeleccionados.length === 0 || !this.hayDisponibles;
  }

  async onSelect(asiento: Asiento) {
    this.loadUserData();
    if(this.user.primaryKey.length > 0){
      asiento.reservadoPor = this.user.primaryKey;
      asiento.estado = EstadoAsiento.SELECCIONADO;
      const data = await this.asientoService.select(asiento.primaryKey,asiento);
      if(data){
        this.updateAsiento(data)
      }
    }
  }

  async desSelect(asiento: Asiento) {
    this.loadUserData();
    if(this.user.primaryKey.length > 0){
      asiento.estado = EstadoAsiento.DISPONIBLE;
      const data = await this.asientoService.desselect(asiento.primaryKey,asiento);
      if(data){
        this.updateAsiento(data)
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
