import { Injectable } from "@angular/core";
import { Carousel } from "../interfaces/promociones.interface";

@Injectable({
    providedIn: 'root'
})

export class PromocionesService{
    ciudades: string[] = [
        'AYACUCHO', 'BAGUA', 'BAGUA GRANDE', 'BARRANCA', 'BELLAVISTA', 
        'CARAZ', 'CARHUAZ', 'CASMA', 'CHACHAPOYAS', 'CHAVIN', 
        'CHEPEN', 'CHICLAYO', 'CHIMBOTE', 'HUACHO', 'HUANCAYO', 
        'HUANUCO', 'HUARAZ', 'HUARI', 'HUARMEY', 'JAEN', 
        'JAUJA', 'JUANJUI', 'LA MERCED', 'LIMA', 'MANCOS', 
        'MOYOBAMBA', 'NUEVA CAJAMARCA', 'OXAPAMPA', 'PACASMAYO', 
        'PARAMONGA', 'PEDRO RUIZ', 'PICHANAQUI', 'PICOTA', 'PIURA', 
        'PUCALLPA', 'PUCARA', 'RECUAY', 'RIOJA', 'SAN MARCOS', 
        'SAN RAMON', 'SATIPO', 'SULLANA', 'TARAPOTO', 'TARMA', 
        'TINGO MARIA', 'TOCACHE', 'TRUJILLO', 'VILLA RICA', 'YUNGAY'
    ];
    destinos = [
        { id: 1, image: 'https://media.istockphoto.com/id/458569733/es/foto/city-square-en-ayacucho-per%C3%BA.jpg?s=612x612&w=0&k=20&c=8eVqNlaNJLdHYIpPoI8HQ-rOvfi9EKkCl4rkEwYa9bc=', description: 'Ayacucho, un destino mágico', name: 'Ayacucho', cost: 1000, startDate: '2024-07-01', endDate: '2024-07-10', busName: 'Bus XYZ', busPlate: 'ABC-123', busLocation: 'Terminal Central', seatsAvailable: 20 },
        { id: 2, image: 'https://media.istockphoto.com/id/1208714328/es/foto/paseo-en-trujillo-per%C3%BA.jpg?s=612x612&w=0&k=20&c=H5ILjY-cs1KHsNzJw6fwzvRtN4GteJ0BiI40PSZz8ac=', description: 'Trujillo, cuna de la cultura', name: 'Trujillo', cost: 1200, startDate: '2024-08-01', endDate: '2024-08-10', busName: 'Bus ABC', busPlate: 'XYZ-456', busLocation: 'Terminal Norte', seatsAvailable: 15 },
        { id: 3, image: 'https://media.istockphoto.com/id/1340591679/es/foto/panorama-de-lima-per%C3%BA.jpg?s=612x612&w=0&k=20&c=dpHAtPAEEYVQzzs5CzM3z_-AYx8fM1S8tt8KNDJw4Nk=', description: 'Lima, la ciudad capital', name: 'Lima', cost: 800, startDate: '2024-09-01', endDate: '2024-09-05', busName: 'Bus 123', busPlate: 'LMN-789', busLocation: 'Terminal Sur', seatsAvailable: 30 },
        { id: 4, image: 'https://media.istockphoto.com/id/1234567890/photo/panorama-de-arequipa-peru.jpg?s=612x612&w=0&k=20&c=XYZ', description: 'Arequipa, la ciudad blanca', name: 'Arequipa', cost: 950, startDate: '2024-10-01', endDate: '2024-10-05', busName: 'Bus 789', busPlate: 'XYZ-321', busLocation: 'Terminal Este', seatsAvailable: 25 },
        { id: 5, image: 'https://media.istockphoto.com/id/9876543210/photo/cusco-inca.jpg?s=612x612&w=0&k=20&c=ABC', description: 'Cusco, la capital inca', name: 'Cusco', cost: 1100, startDate: '2024-07-15', endDate: '2024-07-20', busName: 'Bus 456', busPlate: 'ABC-456', busLocation: 'Terminal Central', seatsAvailable: 20 },
        { id: 6, image: 'https://media.istockphoto.com/id/1234567890/photo/trujillo.jpg?s=612x612&w=0&k=20&c=XYZ', description: 'Trujillo, ciudad de la primavera', name: 'Trujillo', cost: 1100, startDate: '2024-09-15', endDate: '2024-09-20', busName: 'Bus 654', busPlate: 'XYZ-654', busLocation: 'Terminal Centro', seatsAvailable: 15 },
        { id: 7, image: 'https://media.istockphoto.com/id/13579/photo/huaraz.jpg?s=612x612&w=0&k=20&c=XYZ', description: 'Huaraz, paraíso de la aventura', name: 'Huaraz', cost: 900, startDate: '2024-08-15', endDate: '2024-08-20', busName: 'Bus 321', busPlate: 'ABC-654', busLocation: 'Terminal Norte', seatsAvailable: 18 },
        { id: 8, image: 'https://media.istockphoto.com/id/45678/photo/machu-picchu.jpg?s=612x612&w=0&k=20&c=XYZ', description: 'Machu Picchu, maravilla del mundo', name: 'Machu Picchu', cost: 1500, startDate: '2024-07-10', endDate: '2024-07-20', busName: 'Bus 321', busPlate: 'LMN-789', busLocation: 'Terminal Sur', seatsAvailable: 10 },
        { id: 9, image: 'https://media.istockphoto.com/id/23456/photo/cusco.jpg?s=612x612&w=0&k=20&c=XYZ', description: 'Cusco, puerta de los incas', name: 'Cusco', cost: 1200, startDate: '2024-10-10', endDate: '2024-10-15', busName: 'Bus 987', busPlate: 'ABC-111', busLocation: 'Terminal Centro', seatsAvailable: 12 },
        { id: 10, image: 'https://media.istockphoto.com/id/34567/photo/huaraz.jpg?s=612x612&w=0&k=20&c=XYZ', description: 'Huaraz, belleza natural', name: 'Huaraz', cost: 1300, startDate: '2024-11-01', endDate: '2024-11-05', busName: 'Bus 234', busPlate: 'LMN-222', busLocation: 'Terminal Norte', seatsAvailable: 8 },
    ];

    get Ciudades(): string[]{
       return this.ciudades 
    }

    get Detinos (){
        return this.destinos
    }

}