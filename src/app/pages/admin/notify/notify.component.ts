// notify.component.ts
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  notifications: any[] = [];
  selectedNotification: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notifications = this.notificationService.getNotifications();
  }

  selectNotification(notification: any): void {
    this.selectedNotification = notification;
  }

  approveRequest(id: number): void {
    if (window.confirm('¿Estás seguro de que quieres aprobar esta solicitud?')) {
      this.notificationService.approveRequest(id).then(() => {
        this.loadNotifications(); // Recargar las notificaciones después de aprobar
      }).catch((error) => {
        console.error('Error al aprobar la solicitud:', error);
      });
    }
  }

  rejectRequest(id: number): void {
    if (window.confirm('¿Estás seguro de que quieres rechazar esta solicitud?')) {
      this.notificationService.rejectRequest(id).then(() => {
        this.loadNotifications(); // Recargar las notificaciones después de rechazar
      }).catch((error) => {
        console.error('Error al rechazar la solicitud:', error);
      });
    }
  }

  acceptRequest(id: number): void {
    if (window.confirm('¿Estás seguro de que quieres aceptar esta solicitud?')) {
      this.notificationService.acceptRequest(id).then(() => {
        this.loadNotifications(); // Recargar las notificaciones después de aceptar
      }).catch((error) => {
        console.error('Error al aceptar la solicitud:', error);
      });
    }
  }

  deleteNotification(id: number): void {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta notificación?')) {
      this.notificationService.deleteNotification(id).then(() => {
        this.loadNotifications(); // Recargar las notificaciones después de eliminar
      }).catch((error) => {
        console.error('Error al eliminar la notificación:', error);
      });
    }
  }
}
