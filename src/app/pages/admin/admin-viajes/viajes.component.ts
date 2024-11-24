import { Component, OnInit } from '@angular/core';
import { Viaje } from '../../../shared/interfaces/viaje.interface';
import { User } from '../../../shared/interfaces/user.interface';
import { UserService } from '../../../shared/services/user.service';
import { ViajesService } from '../../../shared/services/viajes.service';
import { Bus } from '../../../shared/interfaces/bus.interface';
import { Estacion } from '../../../shared/interfaces/estaciones.interface';
import { BusService } from '../../../shared/services/buses.service';
import { EstacionService } from '../../../shared/services/estaciones.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.css'
})
export class ViajesComponent implements OnInit {

  constructor(private viajeService: ViajesService, private userService: UserService, private busService: BusService, private estacionService: EstacionService){}

  //users
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User = {primaryKey: '',firstName: '',lastName: '',documentNumber: '',documentType: '',email: '',phoneNumber: '',profilePictureUrl: '',userType: '',};
  
  //cargar user desde la bd
  async loadUser(){
      const data =  await this.userService.getUsers();
      this.users = data ?? [];
      this.filteredUsers = this.users;
  }


  
  //buses
  buses: Bus[] = [];
  selectedBus: Bus = {capacidad: 0,modelo: '',placa: '',primaryKey: '',estado: false,createdAt: 0,updatedAt: 0,userAdminId: ''}
  filteredBuses: Bus[] = []
  busSearchQuery: string = '';
  filteredBusResults: Bus[] = [];
 
  // Cargar buses desde la bd
  async loadBuses() {
    const data = await this.busService.findAll();
    this.buses = data ?? [];
    this.filteredBuses = this.buses;
    this.filteredBusResults = this.buses.slice(0, 5);
  }

  // Método para filtrar buses según la consulta
  filterBuses() {
    if (this.busSearchQuery.trim().length > 0) {
      // Filtrar buses basados en el modelo o la placa
      const query = this.busSearchQuery.toLowerCase();
      this.filteredBusResults = this.buses
        .filter(bus => bus.modelo.toLowerCase().includes(query) || bus.placa.toLowerCase().includes(query))
        .slice(0, 5); // Limitar a 5 resultados
    } else {
      // Si no hay búsqueda, mostrar las 5 primeras opciones
      this.filteredBusResults = this.buses.slice(0, 5);
    }
  }


  
  //estaciones
  estaciones: Estacion[] = [];
  filteredEstacion: Estacion[] = []
  selectEstacionOrigen: Estacion = {nombre: '',ubicacion: '',primaryKey: '',estado: false,createdAt: 0,updatedAt: 0,userAdminId: ''}
  selectEstacionDestino: Estacion = {nombre: '',ubicacion: '',primaryKey: '',estado: false,createdAt: 0,updatedAt: 0,userAdminId: ''}
  
  // Cargar estaciones desde la bd
  async loadEstaciones() {
    const data = await this.estacionService.findAll();
    this.estaciones = data ?? [];
    this.filteredEstacion = this.estaciones
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
      this.loadUser();
      this.loadBuses();
      this.loadEstaciones();
    }
    // Cargar viaje desde la bd
    async loadViajes() {
      const data = await this.viajeService.findAll();
      this.viajes = data ?? [];
      this.filteredViajes= this.viajes
    }

    //add viaje
  async addViaje(viaje: Viaje) {
    this.loadUserData();
    if((this.userAdmin && this.userAdmin === 'admin') && (this.userAdminId)){
      // Cambiar el estado del usuario
      const data: Viaje = {
        ...viaje,
        userAdminId: this.userAdminId
      }

      //actualiza
      if(viaje.primaryKey && viaje.primaryKey.length !== 0){
        const response = await this.viajeService.update(viaje.primaryKey,data);
        if(response && typeof response === 'object' && response.primaryKey){
          const closeButton = document.getElementById('closeButtonModalViaje');
          if (closeButton) {
            closeButton.click();
          }
          this.showCustomAlert('Se actualizo correctamente el viaje.', 'success');
          this.loadViajes();
        }else{
          this.showCustomAlert('Error al actualizar el viaje.', "error");
        }
      }else{//registra
        const response = await this.viajeService.create(data);
        if(response && typeof response === 'object' && response.primaryKey){
          const closeButton = document.getElementById('closeButtonModalEstacion');
          if (closeButton) {
            closeButton.click();
          }
          this.showCustomAlert('Se creo correctamente el viaje.', 'success');
          this.loadViajes();
        }else{
          this.showCustomAlert('Error al crear el viaje.', "error");
        }
      }

    }else{
      this.loadViajes();
      this.showCustomAlert('Este usuario no esta permitido que realice esta acción.',"error");
    }
  }

  async updateStatus(viaje: Viaje){
    this.selectViaje = {...viaje};
    this.selectViaje.estado = !viaje.estado;
    await this.addViaje(this.selectViaje)
  }

  userAdminId?: string
  userAdmin?: string
  private loadUserData(): void {
    const data = sessionStorage.getItem('user');
    if (data) {
      const userx: User = JSON.parse(data);
      if(userx){
        this.userAdminId = userx.primaryKey; 
        this.userAdmin = userx.userType; 
      }
    }
  }

  //btns
  async viewDetails(viaje: Viaje){
    if(viaje.userAdminId,viaje.idBus,viaje.idEstacionOrigen,viaje.idEstacionDestino){
      const dataUser = await this.userService.getUserById(viaje.userAdminId);
      const dataBus = await this.busService.findById(viaje.idBus);
      const dataEstacionOrigen = await this.estacionService.findById(viaje.idEstacionOrigen);
      const dataEstacionDestino = await this.estacionService.findById(viaje.idEstacionDestino);
      if(dataUser && dataBus && dataEstacionOrigen && dataEstacionDestino){
        this.selectedUser = {...dataUser};
        this.selectedBus = {...dataBus};
        this.selectEstacionOrigen = {...dataEstacionOrigen};
        this.selectEstacionDestino = {...dataEstacionDestino};
      }
      this.selectViaje = {...viaje}
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
      filtered = filtered.filter(viaje => viaje.createdAt && viaje.createdAt <= endOfDayUnix);
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
      }
  
      //formatear la fecha
      public formatDate(unixTimestamp: number) {
        if(unixTimestamp === 0){
          return `No hay ninguna actulización.`;
        }
        const timestampMs = unixTimestamp.toString().length === 10 ? unixTimestamp * 1000 : unixTimestamp;
        
        // Crea el objeto Date usando el timestamp en milisegundos
        const date = new Date(Number(timestampMs));
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} UTC`;
      }
  
}
