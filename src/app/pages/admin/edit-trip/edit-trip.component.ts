import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../shared/services/inventory.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  trips: any[] = [];
  searchQuery: string = '';
  editMode: boolean = false;
  currentTrip: any = null;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.trips = this.inventoryService.getTrips().filter(trip => !trip.enabled);
    console.log('Loaded trips:', this.trips); 
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

  enableTrip(trip: any): void {
    this.inventoryService.enableTrip(trip.id);
    this.loadTrips();
  }

  searchTrips(): void {
    this.trips = this.inventoryService.searchTrips(this.searchQuery).filter(trip => trip.enabled);
    console.log('Filtered trips:', this.trips); // Debugging line
  }
}
