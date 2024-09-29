import { Component, OnInit, ViewChild } from "@angular/core";
import { Trip } from "../../../shared/interfaces/trip.interface";
import { InventoryService } from "../../../shared/services/inventory.service";
import { TripDetailComponet } from "../trip-details/trip-detail.component";

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
      this.ultimoid = exist ? false : true;
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
  selectTrip(trip: Trip){
    this.tripDetailComponent.UpdateSElectTrip(trip)
  }
}