import { Component, OnInit } from "@angular/core";
import { Viaje } from "../../../shared/interfaces/viaje.interface";
import { ViajesService } from "../../../shared/services/viajes.service";
import { ReservaService } from "../../../shared/services/reseva.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  viajes: Viaje[] = [];
  user: any = null;

  constructor(
    private router: Router,
    private viajeService: ViajesService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this.loadViajes();
    // Cargar usuario desde sessionStorage
    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  // Cargar viajes desde el servicio
  async loadViajes() {
    const data = await this.viajeService.findAllTrue();
    this.viajes = data ?? [];
  }

  // Este método se llama cuando el usuario hace clic en "Reservar"
  onReserve(trip: Viaje) {
    // Verificamos si el usuario está autenticado, si no lo está, intentamos cargarlo desde la cookie
    if (!this.user) {
      this.loadUserData(); // Carga los datos del usuario desde la cookie
    }
  
    // Guardamos el viaje en sessionStorage
    sessionStorage.setItem('selectedTrip', JSON.stringify(trip));
  
    // Guardamos el usuario en sessionStorage
    sessionStorage.setItem('user', JSON.stringify(this.user));
  
    // Redirigir a la página de detalles del viaje
    this.router.navigate(['/trip-detail']);
  }

  // Método para cargar los datos del usuario desde la cookie
  private loadUserData(): void {
    const data = this.getCookie('user');
    if (data) {
      this.user = { ...data }; // Asignamos los datos de la cookie a this.user
    } else {
      this.user = null; // Si no hay datos, seteamos el usuario como null
    }
  }

  // Método para obtener una cookie por su nombre
  private getCookie(name: string): any {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift() || null;
      if (cookieValue) {
        const decodeCookie = decodeURIComponent(cookieValue);
        try {
          return JSON.parse(decodeCookie); // Intentamos parsear la cookie como JSON
        } catch (error) {
          console.error('Error parsing cookie', error);
          return null;
        }
      }
    }
    return null; // Si no se encuentra la cookie, retornamos null
  }
}
