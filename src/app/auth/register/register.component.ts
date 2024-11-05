import { Component, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: Omit<User, 'primaryKey'> = {
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

  isLoading: boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  async createUser() {

    this.isLoading = true;

    // Validación de name
    if (!this.user.firstName) {
      this.showCustomAlert('El nombre de usario no debe estar vacío.', 'error');
      this.isLoading = false;
      return;
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(this.user.firstName)) {
      this.showCustomAlert('El nombre solo debe contener letras.', 'error');
      this.isLoading = false;
      return;
    }

    // Validación de surname
    if (!this.user.lastName) {
      this.showCustomAlert('El apellido de usario no debe estar vacío.', 'error');
      this.isLoading = false;
      return;
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(this.user.lastName)) {
      this.showCustomAlert('El apellido solo debe contener letras.', 'error');
      this.isLoading = false;
      return;
    }

    // Validación de tipo de documento
    const validDocumentTypes = ['DNI', 'RUC', 'PASAPORTE'];
    if (!this.user.documentType) {
      this.showCustomAlert('Selecciona el tipo de documento.', 'error');
      this.isLoading = false;
      return;
    }

    // Validación del número de documento según el tipo seleccionado
    if(!this.user.documentNumber.length){
        this.showCustomAlert('El numero de documento no debe estar vacio.', 'error');
        this.isLoading = false;
        return;
    }
    if (this.user.documentType === 'DNI' && !/^\d{8}$/.test(this.user.documentNumber)) {
      this.showCustomAlert('El DNI debe tener 8 dígitos.', 'error');
      this.isLoading = false;
      return;
    } else if (this.user.documentType === 'RUC' && !/^\d{11}$/.test(this.user.documentNumber)) {
      this.showCustomAlert('El RUC debe tener 11 dígitos.', 'error');
      this.isLoading = false;
      return;
    } else if (this.user.documentType === 'PASAPORTE' && !/^[A-Z0-9]{6,9}$/.test(this.user.documentNumber)) {
      this.showCustomAlert('El número de pasaporte debe tener entre 6 y 9 caracteres alfanuméricos.', 'error');
      this.isLoading = false;
      return;
    }    

    //validacion del numero telefonico
    if(!this.user.phoneNumber.length){
      this.showCustomAlert('El numero de telefono no debe estar vacio.', 'error')
      this.isLoading = false;
        return;
    }else if(this.user.phoneNumber.length !== 9){
      this.showCustomAlert('Ingresa un numero de telefono valido.', 'error')
      this.isLoading = false;
        return;
    } else if (!/^\d+$/.test(this.user.phoneNumber)) {
      this.showCustomAlert('El número de teléfono solo debe contener numeros.', 'error');
      this.isLoading = false;
      return;
    }

    // Validación de email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.user.email) {
      this.showCustomAlert('El correo electrónico no debe estar vacío.', 'error');
      this.isLoading = false;
      return;
    }
    if (!emailPattern.test(this.user.email)) {
      this.showCustomAlert('Por favor, ingresa un correo electrónico válido.', 'error');
      this.isLoading = false;
      return;
    }

    // Validación de contraseña
    if (!this.user.password) {
      this.showCustomAlert('La contraseña no debe estar vacía.', 'error');
      this.isLoading = false;
      return;
    }
    if (this.user.password.length < 6) {
      this.showCustomAlert('La contraseña debe tener al menos 6 caracteres.', 'error');
      this.isLoading = false;
      return;
    }
      const response = await this.userService.createUser(this.user);
      if(response  === 'Usuario creado con éxito.'){
        this.showCustomAlert(response, 'success');
        this.isLoading = false;
        this.resetForm()

        // Cerrar el modal de registro
        const registerModalElement = document.getElementById('registroModal');
        if (registerModalElement) {
          // hacer click en el btn de cerraar modal
          const closeButton = document.getElementById('closeButton');
          if (closeButton) {
            closeButton.click(); // Simula un clic en el botón de cerrar
          }
        }
        // Mostrar el modal de inicio de sesión
        if (this.router.url !== '/admin-user') {
          const loginModalElement = document.getElementById('loginModal');
          if (loginModalElement) {
            //enviar peticion al nabvar
            const loginModal = new bootstrap.Modal(loginModalElement);
            loginModal.show();
          }
        }
      }else{
        this.showCustomAlert(response, 'error');
        this.isLoading = false;
        return;
      }
      this.isLoading = false;
      return;

  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita el comportamiento por defecto del Enter
      this.createUser(); // Llama a la función para crear el usuario
    }
  }
  
  resetForm() {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      userType: 'cliente',
      documentNumber: '',
      documentType: '',
      phoneNumber: '',
      password: '',
      profilePictureUrl: ''
    };
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
