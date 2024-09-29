import { Component  } from "@angular/core";
import { Trip } from "../../../shared/interfaces/trip.interface";

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})

export class TripDetailComponet  {
  trip?: Trip
  detailReserva: boolean = false
  UpdateSElectTrip(tripxd: Trip): Trip{
  this.detailReserva = false
  return this.trip = tripxd
  }
  TougleReservaDetail(){
    this.detailReserva = !this.detailReserva
  }
}
