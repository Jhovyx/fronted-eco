import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css']
})
export class AsientosComponent implements OnInit {
  selectedSeats: number[] = [];
  seatForms: { seatId: number, formData: any, isDataSaved: boolean }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Recuperar los asientos seleccionados desde sessionStorage
    const savedSeats = sessionStorage.getItem('selectedSeats');
    console.log(savedSeats); // Para verificar qué asientos se están recuperando
  
    if (savedSeats) {
      const storedSeats = JSON.parse(savedSeats);
      // Verificar si los asientos guardados son diferentes a los seleccionados actualmente
      if (this.selectedSeats.length === 0 || !this.areArraysEqual(this.selectedSeats, storedSeats)) {
        // Si los asientos seleccionados han cambiado, actualizar el sessionStorage
        this.selectedSeats = storedSeats;
        this.updateSeatForms(); // Actualizar los formularios con los nuevos asientos seleccionados
      } else {
        // Si no han cambiado, solo cargar los formularios guardados
        this.loadSeatForms();
      }
    } else {
      // Si no hay datos de asientos en sessionStorage, simplemente inicializamos los asientos seleccionados
      this.updateSeatForms();
    }
  }

  // Compara dos arrays (para verificar si los asientos seleccionados han cambiado)
  areArraysEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  // Actualizar los formularios de los asientos
  updateSeatForms(): void {
    this.seatForms = this.selectedSeats.map(seatId => ({
      seatId,
      formData: { fullName: '', docType: '', docNumber: '', birthDate: '', gender: '', email: '', phoneNumber: '' },
      isDataSaved: false
    }));
    sessionStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));
    sessionStorage.setItem('seatForms', JSON.stringify(this.seatForms));
  }

  // Cargar los formularios de los asientos desde sessionStorage
  loadSeatForms(): void {
    const savedSeatForms = sessionStorage.getItem('seatForms');
    if (savedSeatForms) {
      this.seatForms = JSON.parse(savedSeatForms);
    }
  }

  // Función para validar el número de celular
  isPhoneNumberValid(phoneNumber: string): boolean {
    const phonePattern = /^\d{9}$/;
    return phonePattern.test(phoneNumber);
  }

  saveSeatData(seatId: number, formData: any, form: any): void {
    const formIndex = this.seatForms.findIndex(form => form.seatId === seatId);

    if (formIndex !== -1) {
      // Verificar si algún campo está vacío o si el número de celular no es válido
      const allFieldsValid = Object.values(formData).every(value => value) && this.isPhoneNumberValid(formData.phoneNumber);
      
      if (!allFieldsValid) {
        form.submitted = true;  // Activar la validación al enviar
        return;
      }

      // Si los datos están guardados, cambiar a modo edición
      if (this.seatForms[formIndex].isDataSaved) {
        this.seatForms[formIndex].isDataSaved = false;  // Permitir edición
      } else {
        this.seatForms[formIndex].formData = formData;  // Guardar los datos
        this.seatForms[formIndex].isDataSaved = true;    // Marcar como guardado
      }

      sessionStorage.setItem('seatForms', JSON.stringify(this.seatForms));
      form.submitted = false;  // Resetear el estado de la validación después de guardar
    }
  }

  goToPayment(): void {
    sessionStorage.setItem('seatForms', JSON.stringify(this.seatForms));
    this.router.navigate(['/pago-detalle']);
  }
}
