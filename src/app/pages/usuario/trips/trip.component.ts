import { Component, OnInit, ViewChild } from "@angular/core";
import { Trip } from "../../../shared/interfaces/trip.interface";
import { InventoryService } from "../../../shared/services/inventory.service";
import { TripDetailComponet } from "../trip-details/trip-detail.component";
import { ReservaAddComponent } from "../reserva/add/add-reserva.component";
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent implements OnInit {
  trips: Trip[] = []
  pagActual: number = 1
  limit: number = 8
  ultimoid: boolean = true
  @ViewChild(TripDetailComponet) tripDetailComponent!: TripDetailComponet;
  @ViewChild(ReservaAddComponent) reservaAddComponent!: ReservaAddComponent;
  constructor(private inventoryService: InventoryService ){}
  ngOnInit(): void {
    this.getTrips()
  }
  async getTrips(){
    const response = await this.inventoryService.FinAllTrips(this.pagActual, this.limit)
    if(response){
      this.trips = response.data
      const exist = this.trips.find(c => c.id === response.message)
      // Si el ID no existe, asigna true a ultimoid
      this.ultimoid = !exist; 
      return
    }
    return
  }
  btnRight(){
    this.pagActual++
    this.getTrips()
  }
  btnLeft(){
    this.pagActual--
    this.getTrips()
  }
  selectTrip(trip: Trip){//detail
    this.tripDetailComponent.UpdateSElectTrip(trip)
    this.detailReserva()
  }

  selectReserve(trip: Trip){
    const userData = sessionStorage.getItem('user');   
    if (!userData) {
      // Mostrar el modal de inicio de sesión
      const loginModalElement = document.getElementById('loginModal');
      if (loginModalElement) {
        //enviar peticion al nabvar
        const loginModal = new bootstrap.Modal(loginModalElement);
        loginModal.show();
      }
    }else{
      // Mostrar el modal de reserva
      const reservaModalElement = document.getElementById('tripModall');
      if (reservaModalElement) {
        //enviar peticion al nabvar
        const reservaModal = new bootstrap.Modal(reservaModalElement);
        reservaModal.show();
      }
    }
  }
  detailReserva(){
    // Mostrar el modal de reserva
    const reservaModalElement = document.getElementById('tripDetailModall');
    if (reservaModalElement) {
      //enviar peticion al nabvar
      const reservaModal = new bootstrap.Modal(reservaModalElement);
      reservaModal.show();
    }
  }

}