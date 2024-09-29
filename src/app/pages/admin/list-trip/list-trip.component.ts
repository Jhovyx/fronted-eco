import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../shared/services/inventory.service';

@Component({
  selector: 'app-list-trip',
  templateUrl: './list-trip.component.html',
  styleUrls: ['./list-trip.component.css']
})
export class ListTripComponent implements OnInit {
  
  trips: any[] = [];
  searchQuery: string = '';
  editMode: boolean = false;
  currentTrip: any = null;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.trips = this.inventoryService.getTrips().filter(trip => trip.enabled);
  }

  deleteTrip(id: number): void {
    this.inventoryService.deleteTrip(id);
    this.loadTrips();
  }

  enterEditMode(trip: any): void {
    this.editMode = true;
    this.currentTrip = { ...trip };
  }

  saveTrip(): void {
    if (this.currentTrip && this.currentTrip.id) {
      this.inventoryService.updateTrip(this.currentTrip);
      this.loadTrips();
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.currentTrip = null;
  }

  disableTrip(trip: any): void {
    this.inventoryService.disableTrip(trip.id);
    this.loadTrips();
  }

  searchTrips(): void {
    this.trips = this.inventoryService.searchTrips(this.searchQuery).filter(trip => trip.enabled);
  }
}
