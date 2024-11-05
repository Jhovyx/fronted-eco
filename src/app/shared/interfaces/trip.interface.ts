export interface Trip{
    id: number;
    imagen: string;
    descripcion: string;
    nombre: string;
    costo: number;
    fechaInicio: string;
    fechaFin: string;
    nombreBus: string;
    placaBus: string;
    ubicacionBus: string;
    asientosDisponibles: number;
}

export interface DestinosResponse {
    message: number;
    data: Trip[];
}

export interface Asientos{
    id: number,
    status: number//0 -1
}