import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    this.isLoading = true; // Activar el spinner
    
    // Validación de email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email) {
      this.showCustomAlert('El correo electrónico no debe estar vacío.', 'error');
      this.isLoading = false;
      return;
    }
    if (!emailPattern.test(this.email)) {
      this.showCustomAlert('Por favor, ingresa un correo electrónico válido.', 'error');
      this.isLoading = false;
      return;
    }

    // Validación de contraseña
    if (!this.password) {
      this.showCustomAlert('La contraseña no debe estar vacía.', 'error');
      this.isLoading = false;
      return;
    }
    if (this.password.length < 6) {
      this.showCustomAlert('La contraseña debe tener al menos 6 caracteres.', 'error');
      this.isLoading = false;
      return;
    }

    try {
      const user = await this.authService.login(this.email, this.password);
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.showCustomAlert('Bienvenido, su sesión ha iniciado correctamente.', 'success');
        this.isLoading = false; // Detener el spinner
        this.password = ''; // Limpiar el campo de contraseña
        this.email = ''; // Limpiar el campo de correo
        location.reload();
      } else {
        this.showCustomAlert('Credenciales incorrectas. Inténtalo de nuevo.', 'error');
        this.isLoading = false; // Detener el spinner
        this.password = ''; // Limpiar el campo de contraseña
        this.email = ''; // Limpiar el campo de correo
      }
    } catch (error) {
      this.showCustomAlert('Ocurrió un error al iniciar sesión. Intenta de nuevo.', 'error');
      this.isLoading = false; // Detener el spinner
      this.password = ''; // Limpiar el campo de contraseña
      this.email = ''; // Limpiar el campo de correo
    } finally {
      this.isLoading = false; // Detener el spinner
      this.password = ''; // Limpiar el campo de contraseña
      this.email = ''; // Limpiar el campo de correo
    }
  }

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
