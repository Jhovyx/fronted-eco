import { Component } from "@angular/core";
import { Asientos, Trip } from "../../../../shared/interfaces/trip.interface";
import { InventoryService } from "../../../../shared/services/inventory.service";
import { User } from "../../../../shared/interfaces/user.interface";

@Component({
    selector: 'app-add-reserva',
    templateUrl: './add-reserva.component.html',
    styleUrl: './add-reserva.component.css'
})

export class ReservaAddComponent {

    constructor(private inventoryService: InventoryService){
        this.getAsientos()
        this.loadUser()
    }

    asientos: Asientos[] = []

    selectAsiento(asiento: Asientos) {
        if (asiento.status === 0) {
            asiento.status = 1; // Cambia a seleccionado
        } else if (asiento.status === 1) {
            asiento.status = 0; // Libera el asiento
        }
    }
    

    getAsientos(): Asientos[]{
        return this.asientos = this.inventoryService.getAsientos()
    }

    user: User = { // Inicializar el objeto `user`
        primaryKey: '',
        email: '',
        firstName: '',
        lastName: '',
        userType: '',
        documentNumber: '',
        documentType: '',
        phoneNumber: '',
        password: '',
        profilePictureUrl: ''
    };

    loadUser(){
        const userData = sessionStorage.getItem('user');
        if (userData) {
        this.user = JSON.parse(userData);
        }
    }

    VloseModal(){
        const closeButton = document.getElementById('closeButtonResxd');
        if (closeButton) {
          closeButton.click();
        }
    }

}