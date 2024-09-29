// notification.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private storageKey = 'notifications';

  constructor() {
    // Inicializa datos de prueba si no hay datos en localStorage
    if (!localStorage.getItem(this.storageKey)) {
      const initialNotifications = [
        { id: 1, user: 'User1', message: 'Solicitud para cancelar el viaje', date: '2024-07-15', type: 'cancel', status: 'pending' },
        { id: 2, user: 'User2', message: 'Nueva notificación', date: '2024-07-16', type: 'info', status: '' },
        { id: 3, user: 'User3', message: 'Solicitud para cambio de horario', date: '2024-07-17', type: 'cancel', status: 'approved' },
        { id: 4, user: 'User4', message: 'Nueva política de privacidad', date: '2024-07-18', type: 'info', status: '' },
        { id: 5, user: 'User5', message: 'Solicitud para vacaciones', date: '2024-07-19', type: 'cancel', status: 'rejected' }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(initialNotifications));
    }
  }

  getNotifications(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveNotifications(notifications: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(notifications));
  }

  approveRequest(id: number): Promise<void> {
    return new Promise((resolve) => {
      const notifications = this.getNotifications();
      const notification = notifications.find(n => n.id === id);
      if (notification && notification.type === 'cancel') {
        notification.status = 'approved';
        this.saveNotifications(notifications);
        console.log(`Solicitud ${id} aprobada.`);
      }
      resolve();
    });
  }

  rejectRequest(id: number): Promise<void> {
    return new Promise((resolve) => {
      const notifications = this.getNotifications();
      const notification = notifications.find(n => n.id === id);
      if (notification && notification.type === 'cancel') {
        notification.status = 'rejected';
        this.saveNotifications(notifications);
        console.log(`Solicitud ${id} rechazada.`);
      }
      resolve();
    });
  }

  acceptRequest(id: number): Promise<void> {
    return new Promise((resolve) => {
      const notifications = this.getNotifications();
      const notification = notifications.find(n => n.id === id);
      if (notification && notification.type === 'cancel') {
        notification.status = 'accepted';
        this.saveNotifications(notifications);
        console.log(`Solicitud ${id} aceptada.`);
      }
      resolve();
    });
  }

  deleteNotification(id: number): Promise<void> {
    return new Promise((resolve) => {
      let notifications = this.getNotifications();
      notifications = notifications.filter(n => n.id !== id);
      this.saveNotifications(notifications);
      console.log(`Notificación ${id} eliminada.`);
      resolve();
    });
  }
}
