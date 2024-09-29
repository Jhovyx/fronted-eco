import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-whatsapp',
    templateUrl: './whatsapp.component.html',
    styleUrls: ['./whatsapp.component.css']
}) 

export class WhatsappComponent{

  //logica para abrir el formulario de consulta
  showForm = false;
  hideTimeout: any;
  checkMouseLeave(event: MouseEvent) {
    const container = document.querySelector('.whatsapp-container') as HTMLElement;
    const form = document.querySelector('.whatsapp-form-container') as HTMLElement;
    if (!container.contains(event.relatedTarget as Node) && !form.contains(event.relatedTarget as Node)) {
      this.hideTimeout = setTimeout(() => {
        this.showForm = false;
      }, 100); // Delay to allow form interaction
    }
  }
  resetHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  //logica para enviar en mensaje
  userMensaje: string =''
  public selectedFile: File | null = null;
  public selectedImageUrl: string | ArrayBuffer | null = null; // Agregado para almacenar la URL de la imagen

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageUrl = e.target.result; // Actualiza la URL de la imagen
      };
      reader.readAsDataURL(this.selectedFile); // Lee el archivo como una URL de datos
    }
  }
  enviarMensaje(){
    if(this.userMensaje.length === 0){
      this.showCustomAlert('El mensaje esta vacio', 'success');
      return
    }else{
      const codificacioMensaje = encodeURIComponent(this.userMensaje)//mensaje
      const telefono: number = 962842910 //numero de telefono
      const url = `https://wa.me/${telefono}?text=${codificacioMensaje}` //url
      window.open(url,'_blank')
      this.userMensaje =''
      this.showForm =false
    }
  }

  

  //alerta de error o exito
    showCustomAlert(message: string, type: 'success' | 'error') {
      // Crear el contenedor de la alerta
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
      alertDiv.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545'; // Verde para éxito, rojo para error
    
      // Establecer el mensaje
      alertDiv.textContent = message;
    
      // Agregar la alerta al body
      document.body.appendChild(alertDiv);
    
      // Eliminar la alerta después de 1.5s segundos
      setTimeout(() => {
        alertDiv.remove();
      }, 1500);
    }
}