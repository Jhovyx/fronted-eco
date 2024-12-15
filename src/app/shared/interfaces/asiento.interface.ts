export interface Asiento {
    primaryKey: string;
    numero: number;
    idBus: string;
    userAdminId: string;
    timestampSeleccion?: number;
    estado: EstadoAsiento;
    reservadoPor?: string;
    createdAt: number;
    updatedAt?: number;
  }

export enum EstadoAsiento {DISPONIBLE = 'DISPONIBLE',SELECCIONADO = 'SELECCIONADO',RESERVADO = 'RESERVADO',}
  