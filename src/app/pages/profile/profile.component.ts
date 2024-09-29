import { Component, OnInit } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { ImgBBResponse, User } from "../../shared/interfaces/user.interface";
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imagePreview: string | ArrayBuffer | null = null; // Vista previa de la imagen
  selectedFile: File | null = null; // Imagen seleccionada
  imgUrlResponse!: string;
  user: User = { // Inicializar el objeto `user`
    id: '',
    email: '',
    name: '',
    surname: '',
    estado: 1,
    cargo: '',
    document_number: '',
    document_type: '',
    phone_number: '',
    password: '',
    profile_picture_url: ''
  };

  originalUser: User = { // Estado inicial del usuario
    id: '',
    email: '',
    name: '',
    surname: '',
    estado: 1,
    cargo: '',
    document_number: '',
    document_type: '',
    phone_number: '',
    password: '',
    profile_picture_url: ''
  };

  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  isLoading: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
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
      // Si no hay imagen seleccionada, devuelve un observable con la URL actual
      return of({
        success: true,
        status: 200,
        data: {
          url: this.user.profile_picture_url
        }
      } as ImgBBResponse);
    }
  }

  updateProfile() {
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

    const hasChanges = this.isUserChanged();
    if (hasChanges || this.selectedFile) {
      this.uploadImage().subscribe(
        (response: ImgBBResponse) => {
          if (response && response.data) {
            this.user.profile_picture_url = response.data.url; // Actualiza la URL de la imagen
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
    const user = await this.userService.updateUser(this.user.id, this.user)
    if(user){
      sessionStorage.setItem('user', JSON.stringify(user));
      this.showCustomAlert('Los datos de actualizaron con éxito.', 'success');
      this.isLoading = false;
      location.reload()
    }else{
      this.showCustomAlert('Error al actulizar los datos de usuario.', 'error');
      this.isLoading = false;
    }
  }


  private isUserChanged(): boolean {
    return (
      this.user.name !== this.originalUser.name ||
      this.user.surname !== this.originalUser.surname ||
      this.user.document_type !== this.originalUser.document_type ||
      this.user.document_number !== this.originalUser.document_number ||
      this.user.phone_number !== this.originalUser.phone_number ||
      this.user.email !== this.originalUser.email ||
      this.user.profile_picture_url !== this.originalUser.profile_picture_url
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

    // Validación de contraseña
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
      const response = await this.userService.updatePassword(this.user.id, this.oldPassword, this.newPassword); // Usa await aquí
      if (response === 'success') {
        this.showCustomAlert('Contraseña actualizada exitosamente.', 'success'); // Corrige 'error' a 'success'
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
        this.isLoading = false
        location.reload()
      } else if(response === 'Old_password_incorrect'){
        this.showCustomAlert('Contraseña actual incorrecta.', 'error'); // Manejo de error
        this.isLoading = false
      } else {
        this.showCustomAlert('Ocurrio un error al actualizar la contraseña.', 'error'); // Manejo de error
        this.isLoading = false
      }
    } else {
      this.showCustomAlert('Las contraseñas no coinciden.', 'info');
      this.isLoading = false
    }
  }

}
