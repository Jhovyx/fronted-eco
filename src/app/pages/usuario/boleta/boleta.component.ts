import { Component, OnInit } from "@angular/core";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as QRCode from 'qrcode'; // Importa el paquete QRCode para generar el código QR
import { Router } from '@angular/router';
@Component({
    selector: 'app-boleta',
    templateUrl: './boleta.component.html',
    styleUrls: ['./boleta.component.css']
})

export class BoletaComponent implements OnInit {
    boletaId: string = ''; // Aquí se almacenará el ID de la boleta

    // Variables para los detalles del pago
    user: any = null;
    trip: any = null;
    selectedSeats: any[] = [];
    fechaEmision: string = new Date().toLocaleDateString();
    metodoPago: string = "TARJETA";  // Suponiendo que es tarjeta siempre

    // Totales
    subtotal: number = 0;
    igv: number = 0;
    total: number = 0;


     // Variables para el QR
   qrCodeUrl: string = ''; // Variable para almacenar la URL de la imagen QR
   constructor(private router: Router) {}  // Inyectar Router para redirigir

    ngOnInit(): void {
        // Recuperar los datos del sessionStorage
        const paymentDetails = JSON.parse(sessionStorage.getItem('paymentDetails') || '{}');

        // Asignar los datos del pago a las variables
        this.user = paymentDetails.user;
        this.trip = paymentDetails.trip;
        this.selectedSeats = paymentDetails.selectedSeats;

        // Calcular los totales
        if (this.trip && this.selectedSeats.length > 0) {
            const costPerSeat = this.trip.costo;
            this.subtotal = costPerSeat * this.selectedSeats.length;
            this.igv = this.subtotal * 0.18;  // Asumiendo un 18% de IGV
            this.total = this.subtotal + this.igv;
        }
        // Dirección IP de la máquina en la red local 
    const pdfUrl = `http://localhost:4200/usuario/boleta.pdf/${this.boletaId}`;

    // Verificar si existe el PDF en sessionStorage y generar el QR
    if (pdfUrl) {
      this.qrCodeUrl = pdfUrl; // Usar la URL del PDF
      this.generateQRCode(pdfUrl);  // Llamar a la función para generar el código QR con esta URL
    }
    }
    // Función para generar el código QR con la URL del PDF
  generateQRCode(url: string) {
    QRCode.toDataURL(url, {
      width: 200,
      margin: 2
    }).then((qrUrl) => {
      this.qrCodeUrl = qrUrl; // Asignar la URL de la imagen del QR generada
    }).catch((err) => {
      console.error('Error al generar el código QR', err);
    });
    }

    
  
    // Función para descargar el comprobante
    Descargar() {
        const element = document.getElementById('comprobante');
        if (element) {
            html2canvas(element).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const doc = new jsPDF();
                const imgWidth = 210; // Ancho en mm para un documento A4
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                doc.save('IMPORTEC.pdf');
            });
        } else {
            return;
        }
    }

    // Función para imprimir el comprobante
    Imprimir() {
        const printContents = document.getElementById('comprobante')?.innerHTML;
        const originalContents = document.body.innerHTML;
        if (printContents) {
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        } else {
            return;
        }
    }
 }
