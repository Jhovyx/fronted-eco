import { Component, OnInit } from '@angular/core';
import { Viaje } from '../../../shared/interfaces/viaje.interface';
import { UserService } from '../../../shared/services/user.service';
import { ViajesService } from '../../../shared/services/viajes.service';
import { Bus } from '../../../shared/interfaces/bus.interface';
import { Estacion } from '../../../shared/interfaces/estaciones.interface';
import { BusService } from '../../../shared/services/buses.service';
import { EstacionService } from '../../../shared/services/estaciones.service';
import { User } from '../../../shared/interfaces/user.interface';
declare var bootstrap: any;

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.css'
})
export class ViajesComponent implements OnInit {

  constructor(private viajeService: ViajesService, private userService: UserService, private busService: BusService, private estacionService: EstacionService){}

  selectedUser: User = {primaryKey: '',firstName: '',lastName: '',documentNumber: '',documentType: '',email: '',phoneNumber: '',profilePictureUrl: '',userType: '',};

  
  //buses
  buses: Bus[] = [];
  selectedBus: Bus = {capacidad: 0,modelo: '',placa: '',primaryKey: '',estado: false,createdAt: 0,updatedAt: 0,userAdminId: ''}
 
  // Cargar buses desde la bd
  async loadBuses() {
    const data = await this.busService.findAllTrue();
    this.buses = data ?? [];
  }


  //estaciones
  estaciones: Estacion[] = [];
  selectEstacionOrigen: Estacion = {nombre: '',ubicacion: '',primaryKey: '',estado: false,createdAt: 0,updatedAt: 0,userAdminId: ''}
  selectEstacionDestino: Estacion = {nombre: '',ubicacion: '',primaryKey: '',estado: false,createdAt: 0,updatedAt: 0,userAdminId: ''}
  
  // Cargar estaciones desde la bd
  async loadEstaciones() {
    const data = await this.estacionService.findAllTrue();
    this.estaciones = data ?? [];
  }
  
  // Viajes
  minDate: string = '2024-01-01';
  maxDate: string = new Date().toISOString().split('T')[0];
  startDate: string = '';
  endDate: string = '';
  viajes: Viaje[] = [];
  filteredViajes: Viaje[] = []
  selectViaje: Viaje = {primaryKey: '',nombre: '',descripcion: '',costo: 0,idBus: '',idEstacionOrigen: '',nombreEstacionOrigen: '', idEstacionDestino: '',nombreEstacionDestino: '',
    fechaHoraSalida: 0, fechaHoraLlegada: 0, estado: false,statusPromo: false, descuentoPorcentaje: 0,userAdminId: '',urlImagen: '',createdAt: 0,updatedAt: 0,};
    ngOnInit(): void {
      this.loadViajes();
      this.loadBuses();
      this.loadEstaciones();
    }
    // Cargar viaje desde la bd
    async loadViajes() {
      const data = await this.viajeService.findAll();
      this.viajes = data ?? [];
      this.filteredViajes = [...this.viajes];
    }

    //add viaje
  async addViaje(viaje: Viaje) {

    //validacion de campos
    if (viaje.nombre.length === 0) {
      this.showCustomAlert('El nombre del viaje es obligatorio.', 'error');
      return;
    }

    if (viaje.descripcion.length === 0) {
      this.showCustomAlert('La descripción es obligatoria.', 'error');
      return;
    }

    if (viaje.urlImagen.length === 0) {
      this.showCustomAlert('El viaje debe de tener una imagen.', 'error');
      return;
    }

    if (!viaje.idBus) {
      this.showCustomAlert('Debe seleccionar un bus.', 'error');
      return;
    }

    if (!viaje.idEstacionOrigen) {
      this.showCustomAlert('Debe seleccionar una estación de origen.', 'error');
      return;
    }

    if (!viaje.idEstacionDestino) {
      this.showCustomAlert('Debe seleccionar una estación de destino.', 'error');
      return;
    }

    if (viaje.idEstacionOrigen === viaje.idEstacionDestino) {
      this.showCustomAlert('La estación de origen y destino no pueden ser la misma.', 'error');
      return;
    }

    if (!viaje.fechaHoraSalida) {
      this.showCustomAlert('Debe ingresar una fecha y hora de salida.', 'error');
      return;
    }

    if (!viaje.fechaHoraLlegada) {
      this.showCustomAlert('Debe ingresar una fecha y hora de llegada.', 'error');
      return;
    }

    if (new Date(viaje.fechaHoraSalida).getTime() >= new Date(viaje.fechaHoraLlegada).getTime()) {
      this.showCustomAlert('La fecha de llegada debe ser posterior a la fecha de salida.', 'error');
      return;
    }

    if (!viaje.statusPromo) {
      // Si no hay promoción,
      viaje.descuentoPorcentaje = 0;
    }
    if (viaje.statusPromo) {
      // Si no hay promoción,
      if(viaje.descuentoPorcentaje < 1 || viaje.descuentoPorcentaje < 100) {
        this.showCustomAlert('Ingrese un porcentaje valido.', 'error');
        return;
      }
    }

    this.loadUserData();
    if (viaje.fechaHoraSalida) {
      viaje.fechaHoraSalida = new Date(viaje.fechaHoraSalida).getTime();
    }
    if (viaje.fechaHoraLlegada) {
      viaje.fechaHoraLlegada = new Date(viaje.fechaHoraLlegada).getTime();
    }
    const {primaryKey,...v} = viaje;
    await this.viajeService.create(v);
    this.ngOnInit();
  }

  async updateViaje(viaje: Viaje) {

    //validacion de campos
    if (viaje.nombre.length === 0) {
      this.showCustomAlert('El nombre del viaje es obligatorio.', 'error');
      return;
    }

    if (viaje.descripcion.length === 0) {
      this.showCustomAlert('La descripción es obligatoria.', 'error');
      return;
    }

    if (viaje.urlImagen.length === 0) {
      this.showCustomAlert('El viaje debe de tener una imagen.', 'error');
      return;
    }

    if (viaje.costo < 1) {
      this.showCustomAlert('El costo debe ser un valor positivo.', 'error');
      return;
    }

    if (!viaje.idBus) {
      this.showCustomAlert('Debe seleccionar un bus.', 'error');
      return;
    }

    if (!viaje.idEstacionOrigen) {
      this.showCustomAlert('Debe seleccionar una estación de origen.', 'error');
      return;
    }

    if (!viaje.idEstacionDestino) {
      this.showCustomAlert('Debe seleccionar una estación de destino.', 'error');
      return;
    }

    if (viaje.idEstacionOrigen === viaje.idEstacionDestino) {
      this.showCustomAlert('La estación de origen y destino no pueden ser la misma.', 'error');
      return;
    }

    if (!viaje.fechaHoraSalida) {
      this.showCustomAlert('Debe ingresar una fecha y hora de salida.', 'error');
      return;
    }

    if (!viaje.fechaHoraLlegada) {
      this.showCustomAlert('Debe ingresar una fecha y hora de llegada.', 'error');
      return;
    }

    if (new Date(viaje.fechaHoraSalida).getTime() >= new Date(viaje.fechaHoraLlegada).getTime()) {
      this.showCustomAlert('La fecha de llegada debe ser posterior a la fecha de salida.', 'error');
      return;
    }

    if (!viaje.statusPromo) {
      // Si no hay promoción,
      viaje.descuentoPorcentaje = 0;
    }
    if (viaje.statusPromo) {
      // Si no hay promoción,
      if(viaje.descuentoPorcentaje < 1 || viaje.descuentoPorcentaje < 100) {
        this.showCustomAlert('Ingrese un porcentaje valido.', 'error');
        return;
      }
    }

    this.loadUserData();
    if (viaje.fechaHoraSalida) {
      viaje.fechaHoraSalida = new Date(viaje.fechaHoraSalida).getTime();
    }
    if (viaje.fechaHoraLlegada) {
      viaje.fechaHoraLlegada = new Date(viaje.fechaHoraLlegada).getTime();
    }
    const {primaryKey,...v} = viaje;
    await this.viajeService.update(primaryKey,v);
    this.ngOnInit();
  }

  async updateStatus(viaje: Viaje){
    this.selectViaje = {...viaje};
    this.selectViaje.estado = !viaje.estado;
    await this.addViaje(this.selectViaje)
  }

  userAdminId?: string
  userAdmin?: string
  private loadUserData(): void {
    const user = this.userService.getCookie('user');
    if (user) {
      this.selectViaje.userAdminId = user.primaryKey;
        this.userAdminId = user.primaryKey; 
        this.userAdmin = user.userType; 
    }
  }

  //btns
  async viewDetails(viaje: Viaje) {
    if (viaje.userAdminId && viaje.idBus && viaje.idEstacionOrigen && viaje.idEstacionDestino) {
      const dataUser = await this.userService.getUserById(viaje.userAdminId);
      const dataBus = await this.busService.findById(viaje.idBus);
      const dataEstacionOrigen = await this.estacionService.findById(viaje.idEstacionOrigen);
      const dataEstacionDestino = await this.estacionService.findById(viaje.idEstacionDestino);
  
      if (dataUser && dataBus && dataEstacionOrigen && dataEstacionDestino) {
        this.selectedUser = { ...dataUser };
        this.selectedBus = { ...dataBus };
        this.selectEstacionOrigen = { ...dataEstacionOrigen };
        this.selectEstacionDestino = { ...dataEstacionDestino };
      }
      this.selectViaje = { ...viaje };
      const registerModalElement = document.getElementById('viajeDetalleModal');
      if (registerModalElement) {
        const registerModal = new bootstrap.Modal(registerModalElement);
        registerModal.show();
      }
    }
  }
  
  btnEdit(viaje: Viaje){
    this.selectViaje = {...viaje}
  }

  btnAdd(){
    this.selectViaje = {primaryKey: '',nombre: '',descripcion: '',costo: 0,idBus: '',idEstacionOrigen: '', nombreEstacionOrigen: '', idEstacionDestino: '', nombreEstacionDestino:'',
      fechaHoraSalida: 0, fechaHoraLlegada: 0, estado: false,statusPromo: false, descuentoPorcentaje: 0,userAdminId: '',urlImagen: '',createdAt: 0,updatedAt: 0,};
  }

  // Filtro por fechas
  filterViaje() {
    let filtered = [...this.viajes]

    // Filtro de fecha DESDE
    if (this.startDate) {
      const startUnix = new Date(this.startDate).getTime();
      filtered = filtered.filter(niaje => niaje.createdAt && niaje.createdAt >= startUnix); // Verificación de createdAt
    }

    // Filtro de fecha HASTA
    if (this.endDate) {
      // Convertir 'endDate' a timestamp Unix
      const endUnix = new Date(this.endDate).getTime();

      // Sumar un día (24 horas en milisegundos) y restar un milisegundo para cubrir todo el día
      const oneDayInMillis = 24 * 60 * 60 * 1000; // Un día en milisegundos
      const endOfDayUnix = endUnix + oneDayInMillis - 1; // Ajustar a las 23:59:59.999 del día

      // Filtrar las actividades usando el valor ajustado
      this.filteredViajes = filtered.filter(viaje => viaje.createdAt && viaje.createdAt <= endOfDayUnix);
    }

    this.filteredViajes = filtered;
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
    
      refresh(){
        this.startDate = '';
        this.endDate = '';
        this.loadViajes();
        this.filteredViajes = [...this.viajes];
      }
  
      //formatear la fecha
      public formatDate(unixTimestamp: number) {
        return this.userService.formatDate(unixTimestamp);
      }
  
}
