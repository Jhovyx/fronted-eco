import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-payment-detail',
    templateUrl: './payment-detail.component.html',
    styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent {
    trip: any = null;  // Datos del viaje (costo, etc.)
    user: any = null;  // Información del usuario
    selectedSeats: any[] = [];  // Asientos seleccionados
  
    minDate: string = new Date().toISOString().split("T")[0]; // Fecha mínima para la selección (hoy)
  
    constructor(private router: Router) {}
  
    ngOnInit(): void {
        // Recuperar los datos de sessionStorage
        const reservationDetails = JSON.parse(sessionStorage.getItem('reservationDetails') || '{}');
    
        // Asignar los datos a las variables del componente
        this.user = reservationDetails.user || null;
        this.trip = reservationDetails.trip || null;
        this.selectedSeats = reservationDetails.seats || [];
        
        // Establecer la fecha mínima para el campo de fecha de vencimiento
        this.minDate = new Date().toISOString().split('T')[0];  // Esto establece la fecha mínima a la fecha actual.
    }

    handleSubmit(): void {
        // Obtener los valores del formulario
        const numeroTarjeta = (document.getElementById('numeroTarjeta') as HTMLInputElement).value;
        const tipoTarjeta = (document.getElementById('tipoTarjeta') as HTMLSelectElement).value;
        const fechaVencimiento = (document.getElementById('fechaVencimiento') as HTMLInputElement).value;
        const codigoSeguridad = (document.getElementById('codigoSeguridad') as HTMLInputElement).value;

        // Crear un objeto con los detalles del pago
        const paymentDetails = {
            numeroTarjeta,
            tipoTarjeta,
            fechaVencimiento,
            codigoSeguridad,
            user: this.user,
            trip: this.trip,
            selectedSeats: this.selectedSeats
        };

        // Guardar los detalles en sessionStorage
        sessionStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));

        // Ahora, si quieres redirigir al usuario a otra página, puedes hacerlo aquí.
         this.router.navigate(['/boleta']);
    }
}
