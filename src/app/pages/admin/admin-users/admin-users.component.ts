import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  users: User[] = [];
  filteredUsers: User[] = []; // Usuarios filtrados
  selectedType: string = 'TODOS'; // Propiedad para almacenar el tipo seleccionado
  searchTerm: string = ''; // Variable para almacenar el término de búsqueda
  user: User = {
    primaryKey: '',
    firstName: '',
    lastName: '',
    email: '',
    userType: 'admin',
    documentNumber: '',
    documentType: '',
    phoneNumber: '',
    password: '',
    profilePictureUrl: ''
  };

  constructor(private userService: UserService) {     this.loadUser()   }


  async loadUser(){
      const data =  await this.userService.getUsers();
      this.users = data ?? [];
      this.filteredUsers = this.users; // Inicializa filteredUsers con todos los usuarios
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();
    this.applyFilters();
  }

  filterUsers() {
    this.applyFilters();
  }

  private applyFilters() {
    // Filtra por tipo
    let filtered = this.selectedType === 'TODOS' ? this.users : this.users.filter(user => user.userType === this.selectedType);

    // Aplica el filtro de búsqueda en los usuarios filtrados previamente por tipo
    if (this.searchTerm) {
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(this.searchTerm) ||
        user.lastName.toLowerCase().includes(this.searchTerm)
      );
    }

    this.filteredUsers = filtered;
  }

  detailUser(data: User){
    this.user = {...data};
  }  

}