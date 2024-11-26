import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

declare var grecaptcha: any; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  isLoading: boolean = false;
  recaptchaResponse: string | null = null;

  constructor( private readonly userService: UserService,  private router: Router) {}

  // Este método se ejecuta después de que la vista ha sido inicializada
  ngAfterViewInit(): void {
    // Aquí renderizamos el widget de reCAPTCHA
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.render('recaptcha', {
        sitekey: '6Ld7UIQqAAAAAIkfL8kIJQEcwkq79VGgh5EvFoT6',
        callback: (response: string) => {
          this.recaptchaResponse = response; // Guardamos la respuesta en recaptchaResponse
        }
      });
    }
  }

  // Método para obtener la respuesta del reCAPTCHA
  getRecaptchaResponse(): string | null {
    return grecaptcha.getResponse(); // Devuelve la respuesta obtenida del widget
  }

  async login() {
    this.isLoading = true;
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

    // Validación de reCAPTCHA
    if (!this.recaptchaResponse) {
      this.showCustomAlert("Por favor, confirma que no eres un robot.", 'error');
      this.isLoading = false;
      return;
    }
    
    try {
      const response = await this.userService.login(this.email, this.password, this.recaptchaResponse);
      if (response && typeof response === 'object' && response.userType) {
        const loginModalElement = document.getElementById('loginModal');
        if (loginModalElement) {
          const closeButton = document.getElementById('closeButtonz');
          if (closeButton) {
            closeButton.click();
          }
        }
        this.showCustomAlert('Bienvenido, acceso ha sido autorizado.', 'success');
        this.password = ''; // Limpiar el campo de contraseña
        this.email = ''; // Limpiar el campo de correo
        if (response.userType === "cliente") this.router.navigate(['/home']);
        if (response.userType === "admin") this.router.navigate(['/admin-viajes']);
      }
    } catch (error) {
      this.showCustomAlert("Credenciales incorrectas.", 'error');
    } finally {
      this.isLoading = false;
    }

  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.login();
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
