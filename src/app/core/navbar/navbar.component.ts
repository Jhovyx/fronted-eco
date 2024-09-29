import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit, OnInit {

  userRol?: string; // Almacena el rol del usuario
  userNombre?: string;
  userCorreo?: string;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initializePopovers();
  }

  ngOnInit(): void {
    this.datos();
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
  }
  

  //cerrar sesion
  cerrarSesion(): void {
    // Elimina todos los datos del sessionStorage
    sessionStorage.clear();
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/home']);
    this.userRol = undefined;
  }

}
