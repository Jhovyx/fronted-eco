import { Component, OnInit } from '@angular/core';
import { Activity } from '../../../shared/interfaces/activity.interface';
import { ActivityService } from '../../../shared/services/activity.service';
import { User } from '../../../shared/interfaces/user.interface';
import { UserService } from '../../../shared/services/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {

  minDate: string = '2024-01-01';
  maxDate: string = new Date().toISOString().split('T')[0];
  activities: Activity[] = [];
  filteredActivities: Activity[] = [];
  filteredActivitiesByUser: Activity[] = [];
  startDate: string = '';
  endDate: string = '';
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User = {
    primaryKey: '',
    firstName: '',
    lastName: '',
    documentNumber: '',
    documentType: '',
    email: '',
    phoneNumber: '',
    profilePictureUrl: '',
    userType: '',
  };
  activity: Activity = {
    activityType: '',
    createdAt: 0,
    detail: '',
    ip: '',
    primaryKey: '',
    userId: ''
  }
  
  userInput: string = '';

  constructor(private activityService: ActivityService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadActivities();
    this.loadUsers();
    this.filteredActivities = this.activities;
  }

  // Cargar actividades desde el servicio
  async loadActivities() {
    const data = await this.activityService.getActivity();
    this.activities = data ?? [];
    this.filteredActivities = [...this.activities];
  }

  // Cargar usuarios desde el servicio
  async loadUsers() {
    const data = await this.userService.getUsers();
    this.users = data ?? [];
    this.filteredUsers = [...this.users];
  }

  ActivitiesFilter(): void {
    let filtered = this.activities;

    // Filtrar por nombre de usuario (userInput)
    if (this.userInput) {
      // Buscar el usuario por su nombre
      const matchingUser = this.users.find(user =>
        user.firstName.toLowerCase().includes(this.userInput.toLowerCase())
      );

      // Si se encuentra un usuario, asignarlo a selectedUser
      if (matchingUser) {
        this.selectedUser = matchingUser;
      }

      // Filtrar las actividades por el userId del usuario encontrado (si se ha encontrado un usuario)
      if (this.selectedUser && this.selectedUser.primaryKey) {
        filtered = filtered.filter(activity => activity.userId === this.selectedUser.primaryKey);
      }
    }
  
    // Filtra por rango de fechas
    if (this.startDate) {
      const startUnix = new Date(this.startDate).getTime();
      filtered = filtered.filter(activity => activity.createdAt >= startUnix);
    }
  
    if (this.endDate) {
      const endUnix = new Date(this.endDate).getTime() + 24 * 60 * 60 * 1000 - 1; // Fin del día
      filtered = filtered.filter(activity => activity.createdAt <= endUnix);
    }
  
    // Actualiza las actividades filtradas
    this.filteredActivities = filtered;
  }
  

  // Actualizar la lista de actividades y usuarios, y reiniciar filtros
  refreshData(): void {
    this.loadActivities();
    this.loadUsers();
    this.startDate = '';
    this.endDate = '';
    this.userInput = '';
    this.selectedUser = {primaryKey: '',firstName: '',lastName: '',documentNumber: '',documentType: '',email: '',phoneNumber: '',profilePictureUrl: '',userType: '',};
    this.filteredActivitiesByUser = [];
    this.filteredActivities = [...this.activities];
  }

  // Obtener detalles de una actividad y cargar el usuario relacionado
  async getDetails(activity: Activity) {
    const userData = await this.userService.getUserById(activity.userId);
    if (userData) {
      this.selectedUser = { ...userData };
    }
    this.activity = {...activity}
  }
  

  public formatDate(unixTimestamp: number) {
    return this.userService.formatDate(unixTimestamp)
  }
}
