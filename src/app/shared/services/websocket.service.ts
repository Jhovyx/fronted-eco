import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Asiento } from '../interfaces/asiento.interface';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket; 

  constructor() {
    this.socket = io(API_CONFIG.apiWebSocket, {withCredentials: true});

    // Manejo de conexión y reconexión
    this.socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor WebSocket');
    });
  }

  // Escuchar actualizaciones de asientos
  listenAsientoActualizado(): Observable<Asiento> {
    return new Observable<Asiento>((observer) => {
      this.socket.on('asientoActualizado', (data: Asiento) => {
        observer.next(data);
      });

      // Limpieza cuando se cancela la suscripción
      return () => {
        this.socket.off('asientoActualizado');
      };
    });
  }
}
