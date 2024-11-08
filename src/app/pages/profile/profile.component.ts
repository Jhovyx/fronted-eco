import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { ImgBBResponse, User } from "../../shared/interfaces/user.interface";
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  imagePreview: string | ArrayBuffer | null = null; // Vista previa de la imagen
  selectedFile: File | null = null; // Imagen seleccionada
  imgUrlResponse!: string;
  user: User = { // Inicializar el objeto `user`
    primaryKey: '',
    email: '',
    firstName: '',
    lastName: '',
    userType: '',
    documentNumber: '',
    documentType: '',
    phoneNumber: '',
    password: '',
    profilePictureUrl: ''
  };

  originalUser: User = { // Estado inicial del usuario
    primaryKey: '',
    email: '',
    firstName: '',
    lastName: '',
    userType: '',
    documentNumber: '',
    documentType: '',
    phoneNumber: '',
    password: '',
    profilePictureUrl: ''
  };

  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  isLoading: boolean = false;

  constructor(private userService: UserService) {
    this.loadUserData(); // Cargar los datos del usuario al inicializar
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Almacenar la vista previa
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreview = null;
      this.selectedFile = null;
    }
  }

  uploadImage(): Observable<ImgBBResponse> {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      return this.userService.uploadImage(this.selectedFile).pipe(
        catchError(error => {
          return throwError(error);
        })
      );
    } else {
      return of({
        success: true,
        status: 200,
        data: {
          url: this.user.profilePictureUrl
        }
      } as ImgBBResponse);
    }
  }

  updateProfile() {
    this.isLoading = true;

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

    let validDocumentTypes = ['DNI', 'RUC', 'PASAPORTE'];

    // Verifica que el tipo de documento esté seleccionado
    if (!this.user.documentType || !validDocumentTypes.includes(this.user.documentType)) {
      this.showCustomAlert('Selecciona un tipo de documento válido.', 'error');
      this.isLoading = false;
      return;
    }

    // Verifica que el número de documento no esté vacío
    if (!this.user.documentNumber || this.user.documentNumber.length === 0) {
      this.showCustomAlert('El número de documento no debe estar vacío.', 'error');
      this.isLoading = false;
      return;
    }

    // Valida el número de documento de acuerdo al tipo seleccionado
    switch (this.user.documentType) {
      case 'DNI':
        if (!/^\d{8}$/.test(this.user.documentNumber)) {
          this.showCustomAlert('El DNI debe tener 8 dígitos.', 'error');
          this.isLoading = false;
          return;
        }
        break;
      case 'RUC':
        if (!/^\d{11}$/.test(this.user.documentNumber)) {
          this.showCustomAlert('El RUC debe tener 11 dígitos.', 'error');
          this.isLoading = false;
          return;
        }
        break;
      case 'PASAPORTE':
        if (!/^[A-Z0-9]{6,9}$/.test(this.user.documentNumber)) {
          this.showCustomAlert('El número de pasaporte debe tener entre 6 y 9 caracteres alfanuméricos.', 'error');
          this.isLoading = false;
          return;
        }
        break;
      default:
        this.showCustomAlert('Tipo de documento no reconocido.', 'error');
        this.isLoading = false;
        return;
    }
 

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

    const hasChanges = this.isUserChanged();
    if (hasChanges || this.selectedFile) {
      this.uploadImage().subscribe(
        (response: ImgBBResponse) => {
          if (response && response.data) {
            this.user.profilePictureUrl = response.data.url; // Actualiza la URL de la imagen
          }
          this.saveUserProfile(); // Guardar el perfil después de subir la imagen
        },
        (error) => {
          this.showCustomAlert('Error al subir la imagen.', 'error');
          this.isLoading = false;
        }
      );
    } else {
      this.showCustomAlert('No se realizaron cambios en el perfil.', 'info');
      this.isLoading = false;
    }
  }

  async saveUserProfile() {
    const updatedUserData = this.getUpdatedUserData();
    // Verificar si hay cambios
    if (Object.keys(updatedUserData).length === 0) {
      this.showCustomAlert('No se realizaron cambios en el perfil.', 'info');
      this.isLoading = false;
      return;
    }
    // Llamar al servicio de actualización con los datos cambiados
    const response = await this.userService.updateUser(this.user.primaryKey, updatedUserData);
    if(response && typeof response === 'object' && response.primaryKey){
      this.loadUserData();
      this.isLoading = false;
      const closeButton = document.getElementById('closeButtonProfile');
      if (closeButton) {
        closeButton.click(); // Simula un clic en el botón de cerrar
      }
      this.showCustomAlert('Los datos de actualizaron con éxito.', 'success');
    }else{
      this.showCustomAlert(response, 'error');
      this.isLoading = false;
    }
  }

  
  private getUpdatedUserData(): Partial<User> {
    const updatedUser: Partial<User> = {};
  
    // Comparar cada campo
    if (this.user.firstName !== this.originalUser.firstName) {
      updatedUser.firstName = this.user.firstName;
    }
    if (this.user.lastName !== this.originalUser.lastName) {
      updatedUser.lastName = this.user.lastName;
    }
    if (this.user.documentType !== this.originalUser.documentType) {
      updatedUser.documentType = this.user.documentType;
    }
    if (this.user.documentNumber !== this.originalUser.documentNumber) {
      updatedUser.documentNumber = this.user.documentNumber;
    }
    if (this.user.phoneNumber !== this.originalUser.phoneNumber) {
      updatedUser.phoneNumber = this.user.phoneNumber;
    }
    if (this.user.email !== this.originalUser.email) {
      updatedUser.email = this.user.email;
    }
    if (this.user.profilePictureUrl !== this.originalUser.profilePictureUrl) {
      updatedUser.profilePictureUrl = this.user.profilePictureUrl;
    }
  
    return updatedUser;
  }
  

  private isUserChanged(): boolean {
    return (
      this.user.firstName !== this.originalUser.firstName ||
      this.user.lastName !== this.originalUser.lastName ||
      this.user.documentType !== this.originalUser.documentType ||
      this.user.documentNumber !== this.originalUser.documentNumber ||
      this.user.phoneNumber !== this.originalUser.phoneNumber ||
      this.user.email !== this.originalUser.email ||
      this.user.profilePictureUrl !== this.originalUser.profilePictureUrl
    );
  }

  private loadUserData(): void {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.originalUser = JSON.parse(userData);
      this.user = { ...this.originalUser }; // Inicializa el objeto `user`
    }
  }

  showCustomAlert(message: string, type: 'success' | 'error' | 'info') {
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
    alertDiv.style.backgroundColor =
      type === 'success' ? '#28a745' :
      type === 'error' ? '#dc3545' : '#17a2b8'; // Verde para éxito, rojo para error, azul para info

    alertDiv.textContent = message;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 1500);
  }

  async updatePassword() {
    this.isLoading = true

    if (!this.oldPassword) {
      this.showCustomAlert('La contraseña actual no debe estar vacía.', 'error');
      this.isLoading = false;
      return;
    }
    if (this.oldPassword.length < 6) {
      this.showCustomAlert('La contraseña actual debe tener al menos 6 caracteres.', 'error');
      this.isLoading = false;
      return;
    }

    if (!this.newPassword) {
      this.showCustomAlert('La contraseña nueva no debe estar vacía.', 'error');
      this.isLoading = false;
      return;
    }
    if (this.newPassword.length < 6) {
      this.showCustomAlert('La contraseña nueva debe tener al menos 6 caracteres.', 'error');
      this.isLoading = false;
      return;
    }

    if (!this.confirmNewPassword) {
      this.showCustomAlert('La contraseña de confimación no debe estar vacía.', 'error');
      this.isLoading = false;
      return;
    }
    if (this.confirmNewPassword.length < 6) {
      this.showCustomAlert('La contraseña de confimación debe tener al menos 6 caracteres.', 'error');
      this.isLoading = false;
      return;
    }

    if (this.newPassword === this.confirmNewPassword) {
      const response = await this.userService.updatePassword(this.user.primaryKey, this.oldPassword, this.newPassword);
      if (response === 'Contraseña actualizada correctamente.') {
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
        this.isLoading = false
        const closeButton = document.getElementById('closeButtonUpdatePasword');
        if (closeButton) {
          closeButton.click();
        }
        this.showCustomAlert(response, 'success'); 
      } else {
        this.showCustomAlert(response, 'error');
        this.isLoading = false
      }
    } else {
      this.showCustomAlert('Las contraseñas no coinciden.', 'info');
      this.isLoading = false
    }
  }

}
