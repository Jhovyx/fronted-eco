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
    const data = await this.viajeService.findAll();
    this.viajes = data ?? [];
  }

  // Este método se llama cuando el usuario hace clic en "Reservar"
  onReserve(trip: Viaje) {
    if (!this.user) {
      // Si el usuario no está autenticado, redirigir al login
      this.router.navigate(['/login']); 
    } else {
      // Guardamos el viaje en sessionStorage
      sessionStorage.setItem('selectedTrip', JSON.stringify(trip));

      // Guardamos el usuario en sessionStorage
      sessionStorage.setItem('user', JSON.stringify(this.user));

      // Redirigir a la página de detalles del viaje
      this.router.navigate(['/trip-detail']);
    }
  }
}
  