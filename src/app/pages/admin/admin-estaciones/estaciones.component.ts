import { Component, OnInit } from '@angular/core';
import { Estacion } from '../../../shared/interfaces/estaciones.interface';
import { User } from '../../../shared/interfaces/user.interface';
import { EstacionService } from '../../../shared/services/estaciones.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styleUrl: './estaciones.component.css'
})
export class AdminEstacionesComponent implements OnInit {
  
  minDate: string = '2024-01-01';
  maxDate: string = new Date().toISOString().split('T')[0];
  startDate: string = '';
  endDate: string = '';
  estaciones: Estacion[] = [];
  selectEstacion: Estacion = {nombre: '',ubicacion: '',primaryKey: '',estado: false,createdAt: 0,updatedAt: 0,userAdminId: ''}
  selectedUser: User = {primaryKey: '',firstName: '',lastName: '',documentNumber: '',documentType: '',email: '',phoneNumber: '',profilePictureUrl: '',userType: '',};
  filteredEstacion: Estacion[] = []
  ngOnInit(): void {
    this.loadEstaciones();
  }

  constructor(private estacionService: EstacionService, private userService: UserService){}

  // Cargar estaciones desde la bd
  async loadEstaciones() {
    const data = await this.estacionService.findAll();
    this.estaciones = data ?? [];
    this.filteredEstacion = this.estaciones
  }

  // Agregar un nuevo bus
  async addEstacion(estacion: Estacion) {
    this.loadUserData();
    if(this.userAdmin && this.userAdmin === 'admin'){
      // Cambiar el estado del usuario
      const data: Estacion = {
        nombre: estacion.nombre,
        ubicacion: estacion.ubicacion,
        userAdminId: this.userAdminId,
        estado: estacion.estado
      }

      //actualiza
      if(estacion.primaryKey && estacion.primaryKey.length !== 0){
        const response = await this.estacionService.update(estacion.primaryKey,data);
        if(response && typeof response === 'object' && response.primaryKey){
          const closeButton = document.getElementById('closeButtonModalEstacion');
          if (closeButton) {
            closeButton.click();
          }
          this.showCustomAlert('Se actualizo correctamente la estacion.', 'success');
          this.loadEstaciones();
        }else{
          this.showCustomAlert('Error al actualizar la estacion.', "error");
        }
      }else{//registra
        const response = await this.estacionService.create(data);
        if(response && typeof response === 'object' && response.primaryKey){
          const closeButton = document.getElementById('closeButtonModalEstacion');
          if (closeButton) {
            closeButton.click();
          }
          this.showCustomAlert('Se creo correctamente el Bus.', 'success');
          this.loadEstaciones();
        }else{
          this.showCustomAlert('Error al crear la estacion.', "error");
        }
      }

    }else{
      this.loadEstaciones();
      this.showCustomAlert('Este usuario no esta permitido que realice esta acción.',"error");
    }
  }

  userAdminId?: string
  userAdmin?: string
  private loadUserData(): void {
    const user = this.userService.getCookie('user');
    if (user) {
        this.userAdminId = user.primaryKey; 
        this.userAdmin = user.userType; 
      
    }
  }

  async viewDetails(estacion: Estacion){
    if(estacion.userAdminId){
      const data = await this.userService.getUserById(estacion.userAdminId);
      if(data){
        this.selectedUser = {...data}
      }
      this.selectEstacion = {...estacion}
    }
  }

  btnEdit(estacion: Estacion){
    this.selectEstacion = {...estacion}
  }

  btnAdd(){
    this.selectEstacion = {nombre: '',ubicacion: '',primaryKey: '',estado: false,createdAt: 0,updatedAt: 0,userAdminId: ''}
  }

  // Filtro por fechas
  filterEtacion() {
    let filtered = [...this.estaciones]

    // Filtro de fecha DESDE
    if (this.startDate) {
      const startUnix = new Date(this.startDate).getTime();
      filtered = filtered.filter(estacion => estacion.createdAt && estacion.createdAt >= startUnix); // Verificación de createdAt
    }

    // Filtro de fecha HASTA
    if (this.endDate) {
      // Convertir 'endDate' a timestamp Unix
      const endUnix = new Date(this.endDate).getTime();

      // Sumar un día (24 horas en milisegundos) y restar un milisegundo para cubrir todo el día
      const oneDayInMillis = 24 * 60 * 60 * 1000; // Un día en milisegundos
      const endOfDayUnix = endUnix + oneDayInMillis - 1; // Ajustar a las 23:59:59.999 del día

      // Filtrar las actividades usando el valor ajustado
      filtered = filtered.filter(estacion => estacion.createdAt && estacion.createdAt <= endOfDayUnix);
    }

    this.filteredEstacion = filtered;
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
      this.loadEstaciones();
    }

    //formatear la fecha
    public formatDate(unixTimestamp: number) {
      return this.userService.formatDate(unixTimestamp)
    }

}
