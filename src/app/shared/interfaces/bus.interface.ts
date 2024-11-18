export interface Bus {
    primaryKey?: string;
    placa: string;
    modelo: string;
    capacidad: number;
    createdAt?: number;
    updatedAt?: number;
    estado?: boolean;
    userAdminId?: string;
}