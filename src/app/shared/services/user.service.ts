import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { ImgBBResponse, User, UserResponse } from '../interfaces/user.interface';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
    providedIn: 'root'
})

export class UserService{
  //ACCEDIENDO ALAS VARIBLES DE CONFIGURACION
  private readonly apiKeyImages = API_CONFIG.apiKeyImages;
  private readonly apiImages = API_CONFIG.apiImages;
  private readonly apiBackend = API_CONFIG.apiBackend;

  //INJECTANDO A HttpClient PARA MANEJAR PETICIONES HTTP
  constructor(private http : HttpClient){}
    

  private navbarComponent!: any;

  setNavbarComponent(component: any): void {
    this.navbarComponent = component;
  }

  showLoginModal(): void {
    if (this.navbarComponent) {
      this.navbarComponent.openModalLogin();
    }
  }

  //OBTENIENDO TODOS LOS USUARIOS
  async getUsers() {
    return await this.http.get<User[]>(`${this.apiBackend}/users`, { withCredentials: true }).toPromise();
  }
    
  //OTENIENDO UN USUARIO POR SU ID
  async getUserById(id: string) {
    return await this.http.get<User>(`${this.apiBackend}/users/user/${id}`, { withCredentials: true }).toPromise();
  }
    
  //ACTUALIZAR UN USUARIO POR SU ID
  async updateUser(id: string, updateUser: Partial<User>) {
    return await this.http.patch<{ message: string }>(`${this.apiBackend}/users/${id}`, updateUser, { withCredentials: true }).toPromise()
  }

  //ACTULIZAR CONTRASEÑA DE USUARIO
  async updatePassword(id: string, oldPassword: string, newPassword: string) {
    const body = {oldPassword, newPassword }; // Prepara el cuerpo de la solicitud
    return await this.http.patch<{ message: string }>(`${this.apiBackend}/users/password/${id}`, body, { withCredentials: true }).toPromise();
  }

  //CREAR USUARIO
  async createUser(newUser: Omit<User, 'primaryKey'>) {
    return await this.http.post<{ message: string }>(`${this.apiBackend}/users`, newUser, { withCredentials: true }).toPromise()
  }   

  //LOGIN
  async login(email: string, password: string, recaptchaResponse: string) {
    return await this.http.post<UserResponse>(`${this.apiBackend}/users/login`, { email, password, recaptchaResponse }, { withCredentials: true }).toPromise();
  }
    
  //CERRAR SESION
  async logoutUser(){
    await this.http.get<{ message: string }>(`${this.apiBackend}/users/logout`, { withCredentials: true }).toPromise();
  }

  //OBTENER USUARIO DE LA COOKIE
  getCookie(name: string): User | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift() || null;
      if (cookieValue) {
        const decodeCookie = decodeURIComponent(cookieValue);
        try {
          const user: User = JSON.parse(decodeCookie);
          return user
        } catch (error) {
          return null;
        }
      }
    }
    return null;
  }

  //SUBIR FOTO DE USUARIO
  uploadImage(file : File): Observable<ImgBBResponse>{
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<ImgBBResponse>(`${this.apiImages}?key=${this.apiKeyImages}`, formData)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  //FORMATEAR LA FECHA 
  formatDate(unixTimestamp: number): string {
    if (unixTimestamp === 0) {
      return `No hay ninguna actualización.`;
    }
  
    const timestampMs = unixTimestamp.toString().length === 10 ? unixTimestamp * 1000 : unixTimestamp;
    const date = new Date(Number(timestampMs));
  
    // Obtener la zona horaria del dispositivo del usuario
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
    // Formatear la fecha según la zona horaria local del usuario
    const formattedDate = date.toLocaleString('es-ES', {
      timeZone: timezone, // Usa la zona horaria local del navegador
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  
    return `${formattedDate}`;
  }
}
