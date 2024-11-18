export interface Estacion {
    primaryKey?: string;

    nombre: string;

    ubicacion: string;

    estado?: boolean;

    createdAt?: number;

    updatedAt?: number;

    userAdminId?: string;
}