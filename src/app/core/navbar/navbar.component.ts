import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user.interface';
declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userRol?: string;
  userNombre?: string;
  userCorreo?: string;
  imgProfile!: string;
  private cookieCheckInterval: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) {    this.loadUserData()  }



  ngOnInit(): void {
    this.initializePopovers();
    this.userService.setNavbarComponent(this);
    this.loadUserData();
    this.startCookieCheck(); // Inicia el chequeo periódico de la cookie
  }

  ngOnDestroy(): void {
    if (this.cookieCheckInterval) {
      clearInterval(this.cookieCheckInterval); // Detenemos el chequeo cuando el componente se destruye
    }
  }

  private loadUserData(): void {
    const user = this.userService.getCookie('user');
    if (user) {
      this.userRol = user.userType;
      this.userNombre = user.firstName;
      this.userCorreo = user.email;
      this.imgProfile = user.profilePictureUrl || '';
    } else {
      this.userRol = '';
      this.userNombre = '';
      this.userCorreo = '';
      this.imgProfile = '';
    }
  }


  private startCookieCheck(): void {
    // Comienza a revisar la cookie cada 1000ms (1 segundo)
    this.cookieCheckInterval = setInterval(() => {
      this.loadUserData(); // Revisa y carga los datos del usuario de la cookie
    }, 1000); // Revisa cada 1 segundo
  }

  initializePopovers(): void {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new bootstrap.Popover(popoverTriggerEl);
    });
  }
  
  cerrarSesion(): void {
    this.userService.logoutUser()
    this.router.navigate(['/home']);
    this.userRol = undefined;
    this.userCorreo = undefined;
    this.userCorreo = undefined;
  }

  openModalRegister() {
    // Cerrar el modal de inicio de sesión antes de abrir el registro
    const closeLoginButton = document.getElementById('closeLoginModal');
    if (closeLoginButton) {
      closeLoginButton.click();
    }

    const registerModalElement = document.getElementById('registroModal');
    if (registerModalElement) {
      const registerModal = new bootstrap.Modal(registerModalElement);
      registerModal.show();
    }
  }

  openModalLogin() {
    // Cerrar el modal de registro antes de abrir el inicio de sesión
    const closeRegisterButton = document.getElementById('closeRegisterModal');
    if (closeRegisterButton) {
      closeRegisterButton.click();
    }

    const loginModalElement = document.getElementById('loginModal');
    if (loginModalElement) {
      const loginModal = new bootstrap.Modal(loginModalElement);
      loginModal.show();
    }
  }
}
