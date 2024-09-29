import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.css']
})
export class ReservationManagementComponent implements OnInit {
  reservations = [
    {
      id: 1,
      user: 'Milagros',
      destination: 'Cusco',
      quantity: 1,
      totalPrice: 'S/500',
      departureDate: '2024-07-01',
      arrivalDate: '2024-07-05',
      bus: 'Bus 01',
      plate: 'ABC123',
      station: 'Trujillo',
      location: 'Jr. Principal 123',
      status: 'Active'
    },
    {
      id: 2,
      user: 'Jhovanny',
      destination: 'Arequipa',
      quantity: 2,
      totalPrice: 'S/300',
      departureDate: '2024-06-15',
      arrivalDate: '2024-06-20',
      bus: 'Bus 02',
      plate: 'XYZ456',
      station: 'Lima',
      location: 'Av. Central 456',
      status: 'Canceled'
    },
    {
      id: 3,
      user: 'Astrid',
      destination: 'Iquitos',
      quantity: 1,
      totalPrice: 'S/200',
      departureDate: '2024-07-24',
      arrivalDate: '2024-07-31',
      bus: 'Bus 03',
      plate: 'LMN789',
      station: 'Trujillo',
      location: 'Av. Externa 789',
      status: 'Active'
    },
    // Add more reservation data as needed
  ];

  selectedReservation: any;

  // Static data for the company
  companyName = 'TRANSPORTES XYZ S.A.C.';
  ruc = '12345678901';

  constructor() { }

  ngOnInit(): void {}

  selectReservation(reservation: any): void {
    this.selectedReservation = reservation;
  }

  printReservation(): void {
    const printContents = document.getElementById('printSection')!.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }
}
