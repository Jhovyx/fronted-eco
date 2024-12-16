import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { User } from "../../../shared/interfaces/user.interface";
import { EstadoReserva, Reserva } from "../../../shared/interfaces/reserva.interface";
import { Pago } from "../../../shared/interfaces/pago.inetrface";
import { ReservaService } from "../../../shared/services/reseva.service";
import { UserService } from "../../../shared/services/user.service";

@Component({
    selector: 'app-boleta',
    templateUrl: './boleta.component.html',
    styleUrls: ['./boleta.component.css']
})

export class BoletaComponent implements OnInit {
    
    usuario: User = {primaryKey: '',firstName: '',lastName: '',documentNumber: '',documentType: '',email: '',phoneNumber: '',profilePictureUrl: '',userType: '',};
    reserva: Reserva = {idUsuario: '',pasajeros: [],idViaje: '',estado: EstadoReserva.CONFIRMADA,fechaViaje: 0,}
    pago: Pago = {primaryKey: '',numeroTarjeta: '',tipoTarjeta: '',fechaVencimiento: '',codigoSeguridad: '',monto: 0, idReserva: '',idUsuario: ''};
    metodoPago: string = "TARJETA";  // Suponiendo que es tarjeta siempre
    fechaEmision: string = new Date().toLocaleDateString();

    constructor(
            private reservaService: ReservaService,
            private router: Router,
                private userService: UserService,
    ){}

    ngOnInit(): void {
        this.loadPago();
        this.loadUser();
    }

    loadPago(){
        const data = sessionStorage.getItem('pago');
        if(data){
            this.pago = JSON.parse(data);
            this.loadReserva(this.pago.idReserva);
        }
    }

    async loadReserva(id: string){
        const data = await this.reservaService.findById(id);
        if(data){
            this.reserva = data;
        }
    }

    loadUser(){
        const data = this.userService.getCookie('user');
        if(data){
            this.usuario = data
        }
    }


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
            doc.save('comprobante.pdf');
        });
    } else {
        console.error('Element comprobante not found');
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
        console.error('Element comprobante not found');
    }
}

    Aceptar() {
        // Aquí puedes limpiar el sessionStorage si lo deseas
        sessionStorage.clear();
        
        // Redirigir al home (ajusta la ruta según tu aplicación)
        this.router.navigate(['/home']);  // Redirige al Home
      }
}
