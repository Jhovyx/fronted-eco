export interface Viaje {
    primaryKey: string; // ID único del viaje
    nombre: string; // Nombre del viaje
    descripcion: string; // Descripción del viaje
    costo: number; // Costo del viaje
    idBus: string; // ID del bus asignado al viaje
    idEstacionOrigen: string; // ID de la estación de origen
    idEstacionDestino: string; // ID de la estación de destino
    fechaHoraSalida: number; // Fecha y hora de salida en formato timestamp
    fechaHoraLlegada: number; // Fecha y hora de llegada en formato timestamp
    estado: boolean; // Estado del viaje (activo/inactivo)
    statusPromo: boolean; // Si el viaje tiene una promoción activa
    descuentoPorcentaje: number; // Porcentaje de descuento si hay una promoción
    userAdminId: string; // ID del administrador que creó o actualizó el viaje
    urlImagen: string; // URL de la imagen asociada al viaje
    createdAt: number; // Fecha de creación del viaje (timestamp)
    updatedAt: number; // Fecha de actualización del viaje (timestamp)
  }
  