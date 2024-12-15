export interface Pasajero {
    firstName: string;      // Nombre
    lastName: string;       // Apellido
    documentType: string;   // Tipo de documento (DNI, pasaporte, etc.)
    documentNumber: string; // Número de documento
    phoneNumber: string;    // Número de teléfono
    email: string;          // Correo electrónico
    idAsiento: string;      // id asiento
    registered: boolean
}