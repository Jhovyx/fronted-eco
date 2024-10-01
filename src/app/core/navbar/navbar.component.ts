import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userRol?: string; // Almacena el rol del usuario
  userNombre?: string;
  userCorreo?: string;

  constructor(private router: Router, private el: ElementRef, private authService: AuthService) {
    this.initializePopovers()
    this.datos()
  }


  initializePopovers(): void {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new bootstrap.Popover(popoverTriggerEl);
    });
  }

  //obtener datos
  datos(): void {
    const userData = sessionStorage.getItem('user');
  
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.userRol = parsedData.cargo; // Asigna el rol del usuario
      this.userNombre = parsedData.name;
      this.userCorreo = parsedData.email;
  
      this.redireccionarUsuario();
    } else {
      // Si no hay datos en sessionStorage, suscribirse al BehaviorSubject
      this.authService.user$.subscribe(user => {
        if (user) {
          this.userRol = user.cargo; // Asigna el rol del usuario
          this.userNombre = user.name;
          this.userCorreo = user.email;
  
          // Actualiza sessionStorage
          sessionStorage.setItem('user', JSON.stringify(user));
          
          this.redireccionarUsuario();
        } else {
          // Manejo si no hay usuario autenticado
          this.userRol = undefined;
          this.userNombre = undefined;
          this.userCorreo = undefined;
        }
      });
    }
  }
  
  // Método para redireccionar según el rol del usuario
  private redireccionarUsuario(): void {
    const adminRoutes = [
      '/notify',
      '/administradores',
      '/reservas-limit',
      '/reservas',
      '/admin-user',
      '/add-viaje',
      '/edit-viaje',
      '/admin-dash',
      '/admin-viajes',
      '/profile'
    ];
  
    const clienteRoutes = [
      '/home',
      '/nosotros',
      '/destinos',
      '/promociones-list',
      '/notify',
      '/reservas',
      '/profile',
      '/boleta'
    ];
  
    const allRoutes = [
      '/home',
      '/nosotros',
      '/destinos',
      '/promociones-list',
    ];
  
    if (this.userRol === 'admin') {
      if (!adminRoutes.includes(this.router.url)) {
        this.router.navigate(['/admin-viajes']);
      }
    } else if (this.userRol === 'cliente') {
      if (!clienteRoutes.includes(this.router.url)) {
        this.router.navigate(['/home']);
      }
    } else {
      if (!allRoutes.includes(this.router.url)) {
        this.router.navigate(['/home']);
      }
    }
  }
  

  
  //cerrar sesion
  cerrarSesion(): void {
    // Elimina todos los datos del sessionStorage
    this.authService.logout()
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/home']);
    this.userRol = undefined;
  }

  openModalRegister(){
    const closeButton = document.getElementById('closeButton1');
    if (closeButton) {
      closeButton.click(); // Simula un clic en el botón de cerrar
    }
    const registerModalElement = document.getElementById('registroModal');
    if (registerModalElement) {
      //enviar peticion al nabvar
      const registerModal = new bootstrap.Modal(registerModalElement);
      registerModal.show();
    }
  }
  openModalLogin(){
    const closeButton = document.getElementById('closeButtonxd');
    if (closeButton) {
      closeButton.click(); // Simula un clic en el botón de cerrar
    }
    // Mostrar el modal de inicio de sesión
    const loginModalElement = document.getElementById('loginModal');
    if (loginModalElement) {
      //enviar peticion al nabvar
      const loginModal = new bootstrap.Modal(loginModalElement);
      loginModal.show();
    }
  }
}
