import { Component } from '@angular/core';
import { Bus } from '../../../shared/interfaces/bus.interface';
import { BusService } from '../../../shared/services/buses.service';
import { User } from '../../../shared/interfaces/user.interface';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.css'
})
export class AminBusesComponent {

  minDate: string = '2024-01-01';
  maxDate: string = new Date().toISOString().split('T')[0];
  startDate: string = '';
  endDate: string = '';
  buses: Bus[] = [];
  selectBus: Bus = {capacidad: 0,modelo: '',placa: '',primaryKey: '',estado: false,createdAt: 0,updatedAt: 0,userAdminId: ''}
  selectedUser: User = {primaryKey: '',firstName: '',lastName: '',documentNumber: '',documentType: '',email: '',phoneNumber: '',profilePictureUrl: '',userType: '',};
  filteredBuses: Bus[] = []
  ngOnInit(): void {
    this.loadBuses();
  }

  constructor(private busService: BusService, private userService: UserService){}

  // Cargar buses desde la bd
  async loadBuses() {
    const data = await this.busService.findAll();
    this.buses = data ?? [];
    this.filteredBuses = this.buses
  }

  // Agregar un nuevo bus
  async addBus(bus: Bus) {
    this.loadUserData();
    if(this.userAdmin && this.userAdmin === 'admin'){
      // Cambiar el estado del usuario
      const data: Bus = {
        capacidad: bus.capacidad,
        modelo: bus.modelo,
        placa: bus.placa,
        userAdminId: this.userAdminId,
        estado: bus.estado
      }

      //actualiza
      if(bus.primaryKey && bus.primaryKey.length !== 0){
        const response = await this.busService.update(bus.primaryKey,data);
        if(response && typeof response === 'object' && response.primaryKey){
          const closeButton = document.getElementById('closeButtonModalBus');
          if (closeButton) {
            closeButton.click();
          }
          this.showCustomAlert('Se actualizo correctamente el Bus.', 'success');
          this.loadBuses();
        }else{
          this.showCustomAlert('Error al actualizar el Bus.', "error");
        }
      }else{//registra
        const response = await this.busService.create(data);
        if(response && typeof response === 'object' && response.primaryKey){
          const closeButton = document.getElementById('closeButtonModalBus');
          if (closeButton) {
            closeButton.click();
          }
          this.showCustomAlert('Se creo correctamente el Bus.', 'success');
          this.loadBuses();
        }else{
          this.showCustomAlert('Error al crear el Bus.', "error");
        }
      }

    }else{
      this.loadBuses();
      this.showCustomAlert('Este usuario no esta permitido que realice esta acción.',"error");
    }
  }

  async updateStatus(bus: Bus){
    this.selectBus = {...bus};
    this.selectBus.estado = !bus.estado;
    await this.addBus(this.selectBus)
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
  async viewDetails(bus: Bus){
    if(bus.userAdminId){
      const data = await this.userService.getUserById(bus.userAdminId);
      if(data){
        this.selectedUser = {...data}
      }
      this.selectBus = {...bus}
    }
  }

  btnEdit(bus: Bus){
    this.selectBus = {...bus}
  }

  btnAdd(){
    this.selectBus = {capacidad: 0,modelo: '',placa: '',primaryKey: '',estado: false,createdAt: 0,updatedAt: 0,userAdminId: ''}
  }

  // Filtro de usuarios por tipo y fechas
  filterBuses() {
    let filtered = [...this.buses]

    // Filtro de fecha DESDE
    if (this.startDate) {
      const startUnix = new Date(this.startDate).getTime();
      filtered = filtered.filter(bus => bus.createdAt && bus.createdAt >= startUnix); // Verificación de createdAt
    }

    // Filtro de fecha HASTA
    if (this.endDate) {
      // Convertir 'endDate' a timestamp Unix
      const endUnix = new Date(this.endDate).getTime();

      // Sumar un día (24 horas en milisegundos) y restar un milisegundo para cubrir todo el día
      const oneDayInMillis = 24 * 60 * 60 * 1000; // Un día en milisegundos
      const endOfDayUnix = endUnix + oneDayInMillis - 1; // Ajustar a las 23:59:59.999 del día

      // Filtrar las actividades usando el valor ajustado
      filtered = filtered.filter(bus => bus.createdAt && bus.createdAt <= endOfDayUnix);
    }

    this.filteredBuses = filtered;
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
      this.loadBuses();
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
