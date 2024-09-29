import { Component } from '@angular/core';
import { InventoryService } from '../../../shared/services/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {
  tripData: any = {
    image: '',
    name: '',
    description: '',
    cost: 0,
    startDate: '',
    endDate: '',
    busName: '',
    busPlate: '',
    busLocation: '',
    seatsAvailable: 0,
    enabled: true // Ensure the trip is enabled by default
  };

  constructor(private inventoryService: InventoryService, private router: Router) {}

  anadirViaje(): void {
    this.inventoryService.addTrip(this.tripData);
    this.router.navigate(['/list']);
  }

  cancelar(): void {
    this.router.navigate(['/list']);
  }
}
