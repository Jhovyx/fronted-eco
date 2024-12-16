export interface Pago {
    numeroTarjeta: string;        // Número de la tarjeta de crédito o débito (16 dígitos)
    tipoTarjeta: string;          // Tipo de tarjeta (Visa, Mastercard, etc.)
    fechaVencimiento: string;     // Fecha de vencimiento de la tarjeta (formato YYYY-MM-DD)
    codigoSeguridad: string;      // Código de seguridad (CVV, 3 o 4 dígitos)
    monto: number;                // Monto a pagar
    titularTarjeta?: string;      // Nombre del titular de la tarjeta (opcional)
    idReserva: string;
    primaryKey: string;
    idUsuario: string;
}
