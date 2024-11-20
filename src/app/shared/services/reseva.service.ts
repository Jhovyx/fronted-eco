import { Injectable } from '@angular/core';
import { Viaje } from '../interfaces/viaje.interface';
;

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private trip: Viaje | null = null;
  private user: any = null;

  setTrip(trip: Viaje) {
    this.trip = trip;
  }

  getTrip(): Viaje | null {
    return this.trip;
  }

  setUser(user: any) {
    this.user = user;
  }

  getUser(): any {
    return this.user;
  }

  clear() {
    this.trip = null;
    this.user = null;
  }
}
