import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.css']
})
export class BoletaComponent implements OnInit {
  trip: any = null;  // Datos del viaje (costo, etc.)
  user: any = null;  // Información del usuario
  selectedSeats: any[] = [];  // Asientos seleccionados

  // Función para obtener el costo total sin impuestos
  getCostoTotal(): number {
    if (this.trip && this.selectedSeats) {
      return this.trip.costo * this.selectedSeats.length;
    } else {
      return 0;
    }
  }

  // Función para obtener el costo total con impuestos (18% en este caso)
  getCostoConImpuesto(): number {
    if (this.trip && this.selectedSeats) {
      return this.trip.costo * this.selectedSeats.length * 1.18;
    } else {
      return 0;
    }
  }

  // Función para obtener el costo de un solo asiento
  getCostoPorAsiento(): number {
    if (this.trip) {
      return this.trip.costo;
    } else {
      return 0;
    }
  }

  constructor(private router: Router) {}  // Inyectar Router si planeas redirigir

  ngOnInit(): void {
    // Recupera los datos desde sessionStorage
    const selectedTrip = sessionStorage.getItem('selectedTrip');
    const userData = sessionStorage.getItem('user');
    const selectedSeats = sessionStorage.getItem('selectedSeats');

    // Asigna los datos recuperados
    if (selectedTrip) {
      this.trip = JSON.parse(selectedTrip);
    }

    if (userData) {
      this.user = JSON.parse(userData);
    }

    if (selectedSeats) {
      this.selectedSeats = JSON.parse(selectedSeats);
    }
  }

   // Método para descargar el PDF
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
    }
}

// Método para imprimir el comprobante
Imprimir() {
    const printContents = document.getElementById('comprobante')?.innerHTML;
    const originalContents = document.body.innerHTML;
    if (printContents) {
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }
}

}




/*
import { Component } from "@angular/core";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-boleta',
    templateUrl: './boleta.component.html',
    styleUrl: './boleta.component.css'
})

export class BoletaComponent{
    //descargar
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
            return
        }
    }

     //imprimir 
     Imprimir() {
        const printContents = document.getElementById('comprobante')?.innerHTML;
        const originalContents = document.body.innerHTML;
        if (printContents) {
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        } else {
            return
        }
    }
}*/