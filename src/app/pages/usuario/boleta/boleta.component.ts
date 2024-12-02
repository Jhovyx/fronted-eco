import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-boleta',
    templateUrl: './boleta.component.html',
    styleUrls: ['./boleta.component.css']
})

export class BoletaComponent implements OnInit {
    // Variables para los detalles del pago
    user: any = null;
    trip: any = null;
    selectedSeats: any[] = [];
    seatForms: any[] = [];  // Asegúrate de definir esta propiedad
    fechaEmision: string = new Date().toLocaleDateString();
    metodoPago: string = "TARJETA";  // Suponiendo que es tarjeta siempre

    // Totales
    subtotal: number = 0;
    igv: number = 0;
    total: number = 0;
     // Inyectamos el Router
  constructor(private router: Router) {}

    ngOnInit(): void {
       // Recuperar los datos del sessionStorage
  const paymentDetails = JSON.parse(sessionStorage.getItem('paymentDetails') || '{}');
  const seatForms = JSON.parse(sessionStorage.getItem('seatForms') || '[]');
  const storedSelectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats') || '[]');

        this.user = paymentDetails.user;
        this.trip = paymentDetails.trip;
        this.selectedSeats = storedSelectedSeats.length > 0 ? storedSelectedSeats : paymentDetails.selectedSeats;
        this.seatForms = seatForms;  // Cargar la información de los pasajeros
// Calcular los totales
if (this.trip && this.selectedSeats.length > 0) {
    const costPerSeatWithIgv = this.trip.costo;  // El precio que ya incluye el IGV
    const igvPercentage = 0.18;  // 18% de IGV

    // Subtotal: Precio unitario dividido entre (1 + IGV) para obtener el valor sin IGV
    this.subtotal = +(costPerSeatWithIgv / (1 + igvPercentage) * this.selectedSeats.length).toFixed(2);

    // El IGV es la diferencia entre el precio total y el subtotal (sin IGV)
    this.igv = +(costPerSeatWithIgv * this.selectedSeats.length - this.subtotal).toFixed(2);

    // Total: Precio total por los asientos seleccionados (que ya incluye IGV)
    this.total = +(costPerSeatWithIgv * this.selectedSeats.length).toFixed(2);
}



  }


    // Función para descargar el comprobante de cada pasajero
    Descargar() {
        this.seatForms.forEach(passenger => {
            const element = document.getElementById('comprobante');
            if (element) {
                // Modificar los datos del pasajero en la plantilla para reflejar el nombre de cada uno
                const passengerElement = element.cloneNode(true) as HTMLElement;
                passengerElement.querySelector('#pasajeroNombre')!.textContent = passenger.formData.fullName;  // Aquí asumes que has agregado un lugar para mostrar el nombre del pasajero.

                html2canvas(passengerElement).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const doc = new jsPDF();
                    const imgWidth = 210; // Ancho en mm para un documento A4
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                    doc.save(`${passenger.formData.fullName}_boleta.pdf`);
                });
            }
        });
    }

    // Función para imprimir la boleta para cada pasajero
    Imprimir() {
        this.seatForms.forEach(passenger => {
            const element = document.getElementById('comprobante');
            if (element) {
                // Modificar los datos del pasajero en la plantilla
                const passengerElement = element.cloneNode(true) as HTMLElement;
                passengerElement.querySelector('#pasajeroNombre')!.textContent = passenger.formData.fullName; // Colocar el nombre del pasajero.

                const printContents = passengerElement.innerHTML;
                const originalContents = document.body.innerHTML;
                document.body.innerHTML = printContents;
                window.print();
                document.body.innerHTML = originalContents;
            }
        });
    }

    Aceptar() {
        // Aquí puedes limpiar el sessionStorage si lo deseas
        sessionStorage.clear();
        
        // Redirigir al home (ajusta la ruta según tu aplicación)
        this.router.navigate(['/home']);  // Redirige al Home
      }
}
