import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: Omit<User, 'id'> = {
    name: '',
    surname: '',
    email: '',
    estado: 1,
    cargo: 'cliente',
    document_number: '',
    document_type: '',
    phone_number: '',
    password: '',
    profile_picture_url: ''
  };

  isLoading: boolean = false;

  constructor(private userService: UserService) {}

  async createUser() {

    this.isLoading = true;

    // Validación de name
    if (!this.user.name) {
      this.showCustomAlert('El nombre de usario no debe estar vacío.', 'error');
      this.isLoading = false;
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(this.user.name)) {
      this.showCustomAlert('El nombre solo debe contener letras.', 'error');
      this.isLoading = false;
      return;
    }

    // Validación de surname
    if (!this.user.surname) {
      this.showCustomAlert('El apellido de usario no debe estar vacío.', 'error');
      this.isLoading = false;
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(this.user.surname)) {
      this.showCustomAlert('El apellido solo debe contener letras.', 'error');
      this.isLoading = false;
      return;
    }

    // Validación de tipo de documento
    const validDocumentTypes = ['DNI', 'RUC', 'PASAPORTE'];
    if (!this.user.document_type) {
      this.showCustomAlert('Selecciona el tipo de documento.', 'error');
      this.isLoading = false;
      return;
    }

    // Validación del número de documento según el tipo seleccionado
    if(!this.user.document_number.length){
        this.showCustomAlert('El numero de documento no debe estar vacio.', 'error');
        this.isLoading = false;
        return;
    }
    if (this.user.document_type === 'DNI' && !/^\d{8}$/.test(this.user.document_number)) {
      this.showCustomAlert('El DNI debe tener 8 dígitos.', 'error');
      this.isLoading = false;
      return;
    } else if (this.user.document_type === 'RUC' && !/^\d{11}$/.test(this.user.document_number)) {
      this.showCustomAlert('El RUC debe tener 11 dígitos.', 'error');
      this.isLoading = false;
      return;
    } else if (this.user.document_type === 'PASAPORTE' && !/^[A-Z0-9]{6,9}$/.test(this.user.document_number)) {
      this.showCustomAlert('El número de pasaporte debe tener entre 6 y 9 caracteres alfanuméricos.', 'error');
      this.isLoading = false;
      return;
    }    

    //validacion del numero telefonico
    if(!this.user.phone_number.length){
      this.showCustomAlert('El numero de telefono no debe estar vacio.', 'error')
      this.isLoading = false;
        return;
    }else if(this.user.phone_number.length !== 9){
      this.showCustomAlert('Ingresa un numero de telefono valido.', 'error')
      this.isLoading = false;
        return;
    } else if (!/^\d+$/.test(this.user.phone_number)) {
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
      if(response === 'success'){
        this.showCustomAlert('La cuenta fue creada con éxito.', 'success');
        this.isLoading = false;
        this.resetForm()
        location.reload()
      }else if(response === 'email_in_use'){
        this.showCustomAlert('El correo ingresado ya esta registrado.', 'error');
        this.isLoading = false;
        return;
      }else if(response === 'error'){
        this.showCustomAlert('Ocurrio un error al crear la cuenta.', 'error');
        this.isLoading = false;
        return;
      }
      this.isLoading = false;
      return;

  }


  resetForm() {
    this.user = {
      name: '',
      surname: '',
      email: '',
      estado: 1,
      cargo: 'cliente',
      document_number: '',
      document_type: '',
      phone_number: '',
      password: '',
      profile_picture_url: ''
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
