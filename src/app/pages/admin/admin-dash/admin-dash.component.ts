import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  activities = [
    { id: 1, email: 'admin1@example.com', firstName: 'Admin', lastName: 'One', activityType: 'Inicio de sesión', activityTime: '2024-08-01T08:00:00', description: 'Inicio de sesión en el sistema' },
    { id: 2, email: 'milagritos@example.com', firstName: 'Milagritos', lastName: 'User', activityType: 'Reservó un viaje', activityTime: '2024-08-01T09:00:00', description: 'Reservó un viaje a Cusco' },
    { id: 3, email: 'jhovanny@example.com', firstName: 'Jhovanny', lastName: 'User', activityType: 'Se Registró', activityTime: '2024-07-31T10:00:00', description: 'Registro de nuevo usuario' },
    { id: 4, email: 'admin2@example.com', firstName: 'Admin', lastName: 'Two', activityType: 'Editar un viaje', activityTime: '2024-07-30T11:00:00', description: 'Editó detalles de un viaje existente' },
    // Añadir más actividades según sea necesario
  ];

  selectedActivity: any;

  constructor() { }

  ngOnInit(): void {}

  selectActivity(activity: any): void {
    this.selectedActivity = activity;
  }
}
