import { Component } from "@angular/core";

@Component({
    selector: 'app-payment-detail',
    templateUrl: './payment-detail.component.html',
    styleUrl: './payment-detail.component.css'
})

export class PaymentDetailComponent{
    minDate: string = new Date().toISOString().split('T')[0];
    //agregar campos de cantidad en soles 
    //metodo para validar datos del detalle de pago
    //metodo para enviar los datos al servicio
    
}   