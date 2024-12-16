import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Reserva } from "../../../shared/interfaces/reserva.interface";
import { Pago } from "../../../shared/interfaces/pago.inetrface";
import { PagoService } from "../../../shared/services/pago.service";
import { UserService } from "../../../shared/services/user.service";

@Component({
    selector: 'app-payment-detail',
    templateUrl: './payment-detail.component.html',
    styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
    reserva!: Reserva; // Para cargar datos desde sessionStorage
    pago: Pago = {
        primaryKey: '',
        numeroTarjeta: '',
        tipoTarjeta: '',
        fechaVencimiento: '',
        codigoSeguridad: '',
        monto: 0, // Se ajustará basado en los datos de la reserva
        idReserva: '',
        idUsuario: ''
    };

    minDate: string = new Date().toISOString().split("T")[0]; // Fecha mínima para la selección (hoy)
    isProcessing: boolean = false; // Para mostrar estado de carga

    constructor(private router: Router, private pagosService: PagoService, private userService: UserService) {}

    ngOnInit(): void {
        this.loadReserva();
        this.loadUser();
    }

    loadReserva(): void {
        const data = sessionStorage.getItem('reserva');
        if (data) {
            this.reserva = JSON.parse(data);
            this.pago.idReserva = this.reserva.primaryKey!
            this.pago.monto = this.reserva.costoTotal!
        }
    }

    loadUser(){
        const user = this.userService.getCookie('user');
        if(user) {
            this.pago.idUsuario = user.primaryKey
        }
    }

    async pagar(pago: Pago) {
        if (pago.numeroTarjeta.length !== 16) {
            this.showCustomAlert('Número de tarjeta inválido.', 'error');
            return;
        }
        if (!pago.tipoTarjeta) {
            this.showCustomAlert('Tipo de tarjeta no seleccionado.', 'error');
            return;
        }
    
        if (!pago.fechaVencimiento || new Date(pago.fechaVencimiento) < new Date()) {
            this.showCustomAlert('Fecha de vencimiento inválida', 'error');
            return;
        }
    
        if (!pago.codigoSeguridad || !/^\d{3,4}$/.test(pago.codigoSeguridad)) {
            this.showCustomAlert('Código de seguridad inválido', 'error');
            return;
        }
    
        // Activar el estado de carga
        this.isProcessing = true;
    
        try {
            const response = await this.pagosService.create(pago);
    
            if (response && typeof response === 'object' && response.primaryKey) {
                sessionStorage.setItem('pago', JSON.stringify(response));
                this.showCustomAlert('Se realizó con éxito el pago.', 'success');
                this.router.navigate(['/boleta']);
            } else {
                this.showCustomAlert('Error al procesar el pago.', 'error');
            }
        } catch (error) {
            this.showCustomAlert('Error al procesar el pago.', 'error');
        } finally {
            // Desactivar el estado de carga
            this.isProcessing = false;
        }
    }
    

      
// Alerta de error o éxito
showCustomAlert(message: string, type: 'success' | 'error') {
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '50%';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translate(-50%, -50%)';
    alertDiv.style.padding = '20px';
    alertDiv.style.zIndex = '1055';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.color = '#fff';
    alertDiv.style.fontSize = '16px';
    alertDiv.style.textAlign = 'center';
    alertDiv.style.minWidth = '300px';
    alertDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    alertDiv.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.remove();
    }, 1500);
  }
}
