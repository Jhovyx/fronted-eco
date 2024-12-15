import { Pasajero } from "./pasajero.interface";

export interface Reserva {
    primaryKey?: string;               // Identificador único de la reserva
    idUsuario: string;        // ID del usuario que realiza la reserva
    idViaje: string;          // ID del viaje asociado (viaje específico con fecha)
    fechaViaje: number;       // Fecha y hora del viaje
    estado: EstadoReserva;    // Estado de la reserva (PENDIENTE, CONFIRMADA, CANCELADA)
    pasajeros: Pasajero[];      // Lista de IDs de pasajeros
    costoUnitario?: number; // Costo por pasajero o asiento
    costoTotal?: number; // Costo total de la reserva
    descuentoPorcentaje?: number; // Porcentaje de descuento (0-100)
  }
  
  export enum EstadoReserva {
    PENDIENTE = 'PENDIENTE',
    CONFIRMADA = 'CONFIRMADA',
    CANCELADA = 'CANCELADA',
  }
  