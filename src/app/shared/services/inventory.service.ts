import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asientos, DestinosResponse, Trip } from '../interfaces/trip.interface';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private busesKey = 'buses'; // Clave para almacenar buses en localStorage
  private stationsKey = 'stations'; //ESTACIONES

  private trips: any[] = [
    { id: 1 ,image: 'https://www.peru.travel/Contenido/Destino/Imagen/es/8/1.4/Principal/lima-banner-3.jpg', description: 'Lima, la ciudad de cerros con lunas', name: 'Lima', cost: 1000, startDate: '2024-07-01', endDate: '2024-07-10', busName: 'Bus XYZ', busPlate: 'ABC-123', busLocation: 'Terminal Central', seatsAvailable: 20 },
    { id: 2,image: 'https://media.istockphoto.com/id/458569733/es/foto/city-square-en-ayacucho-per%C3%BA.jpg?s=612x612&w=0&k=20&c=8eVqNlaNJLdHYIpPoI8HQ-rOvfi9EKkCl4rkEwYa9bc=', description: 'Ayacucho abrigador', name: 'Ayacucho', cost: 1000, startDate: '2024-07-01', endDate: '2024-07-10', busName: 'Bus abc', busPlate: 'ABC-123', busLocation: 'Terminal Central', seatsAvailable: 20 },
    { id: 3,image: 'https://www.plataforma10.com.pe/viajes/wp-content/uploads/2023/05/cajamarca-aerea.webp', description: 'Cajamarca Celestial', name: 'Cajamarca', cost: 1000, startDate: '2024-07-01', endDate: '2024-07-10', busName: 'Bus XYZ', busPlate: 'ABC-123', busLocation: 'Terminal Central', seatsAvailable: 20 },
    { id: 4,image: 'https://cdn.pixabay.com/photo/2017/05/12/23/09/arequipa-2308382_1280.jpg', description: 'Arequipa místico', name: 'Arequipa', cost: 1000, startDate: '2024-07-01', endDate: '2024-07-10', busName: 'Bus XYZ', busPlate: 'ABC-123', busLocation: 'Terminal Central', seatsAvailable: 20 },
    { id: 5,image: 'https://media.istockphoto.com/id/515972508/es/foto/plaza-de-armas.jpg?s=612x612&w=0&k=20&c=G3WFkOR2nrVOKpDwpenPqUrp9_lFJFjJ6M6ItuPz79Q=', description: 'Cusco extrovertido', name: 'Cusco', cost: 1000, startDate: '2024-07-01', endDate: '2024-07-10', busName: 'Bus XYZ', busPlate: 'ABC-123', busLocation: 'Terminal Central', seatsAvailable: 20 },
    { id: 6, image: 'https://elcomercio.pe/resizer/cwJfD7zYu2qtN76bk6s0eH9v-gA=/1200x900/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/JUTY3PKYF5DQPLDSGQHVY5OMT4.jpg', description: 'Lambayeque único', name: 'Lambayeque', cost: 1000, startDate: '2024-07-01', endDate: '2024-07-10', busName: 'Bus XYZ', busPlate: 'ABC-123', busLocation: 'Terminal Central', seatsAvailable: 20 },
    { id: 7,image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN8k_-U-tK_v_o-uLxnZKUGFyQ6zzLCHWHgA&s', description: 'Junín deseable', name: 'Junin', cost: 1000, startDate: '2024-07-01', endDate: '2024-07-10', busName: 'Bus XYZ', busPlate: 'ABC-123', busLocation: 'Terminal Central', seatsAvailable: 20 },
    { id: 8,image: 'https://www.xtravelperu.com/blog/wp-content/uploads/2023/06/puno-imagen-xtravel.jpg', description: 'Puno cálido', name: 'Puno', cost: 1000, startDate: '2024-07-01', endDate: '2024-07-10', busName: 'Bus XYZ', busPlate: 'ABC-123', busLocation: 'Terminal Central', seatsAvailable: 20 },
    { id: 9,image: 'https://e.rpp-noticias.io/large/2014/08/01/1068979.jpg', description: 'Cascas inolvidable', name: 'Cascas', cost: 1000, startDate: '2024-07-01', endDate: '2024-07-10', busName: 'Bus XYZ', busPlate: 'ABC-123', busLocation: 'Terminal Central', seatsAvailable: 20 },
    { id:10, image: 'https://noticias-pe.laiglesiadejesucristo.org/media/960x540/Chimbote-2.jpg', description: 'Chimbote mágico', name: 'Chimbote', cost: 1000, startDate: '2024-07-01', endDate: '2024-07-10', busName: 'Bus XYZ', busPlate: 'ABC-123', busLocation: 'Terminal Central', seatsAvailable: 20 },// Otros viajes aquí
  ];
  //
  private enabledTrips: number[] = [];

//ESTACIONES
getStations(): any[] {
  const stations = localStorage.getItem(this.stationsKey);
  return stations ? JSON.parse(stations) : [];
}

addStation(station: any): void {
  const stations = this.getStations();
  stations.push(station);
  localStorage.setItem(this.stationsKey, JSON.stringify(stations));
}

updateStation(updatedStation: any): void {
  const stations = this.getStations();
  const index = stations.findIndex(station => station.id === updatedStation.id);
  if (index > -1) {
    stations[index] = updatedStation;
    localStorage.setItem(this.stationsKey, JSON.stringify(stations));
  }
}

deleteStation(stationId: number): void {
  let stations = this.getStations();
  stations = stations.filter(station => station.id !== stationId);
  localStorage.setItem(this.stationsKey, JSON.stringify(stations));
}

  //buses
    
  getTrips(): any[] {
    return this.trips;
  }

  deleteTrip(id: number): void {
    const tripIndex = this.trips.findIndex(trip => trip.id === id);
    if (tripIndex !== -1) {
      this.trips.splice(tripIndex, 1);
    }
  }

  updateTrip(updatedTrip: any): void {
    const tripIndex = this.trips.findIndex(trip => trip.id === updatedTrip.id);
    if (tripIndex !== -1) {
      this.trips[tripIndex] = updatedTrip;
    }
  }

  disableTrip(id: number): void {
    const tripIndex = this.trips.findIndex(trip => trip.id === id);
    if (tripIndex !== -1) {
      this.trips[tripIndex].enabled = false;
      this.enabledTrips = this.enabledTrips.filter(tripId => tripId !== id);
      localStorage.setItem('enabledTrips', JSON.stringify(this.enabledTrips));
    }
  }
  enableTrip(id: number): void {
    const trip = this.trips.find(trip => trip.id === id);
    if (trip) {
      trip.enabled = true;
      this.enabledTrips.push(id);
      localStorage.setItem('enabledTrips', JSON.stringify(this.enabledTrips));
    }
  }


  searchTrips(query: string): any[] {
    return this.trips.filter(trip => trip.name.toLowerCase().includes(query.toLowerCase()));
  }

  addTrip(trip: any): void {
    this.trips.push(trip);
  }

  editTrip(id: number, updatedTrip: any): void {
    const index = this.trips.findIndex(trip => trip.id === id);
    if (index !== -1) {
      this.trips[index] = { ...this.trips[index], ...updatedTrip };
    }
  }

  ///////////7

  // Obtener los buses almacenados en localStorage
  getBuses(): any[] {
    const buses = localStorage.getItem(this.busesKey);
    return buses ? JSON.parse(buses) : [];
  }

  // Guardar o actualizar los buses en localStorage
  saveBuses(buses: any[]): void {
    localStorage.setItem(this.busesKey, JSON.stringify(buses));
  }

  // Agregar un nuevo bus
  addBus(bus: any): void {
    const buses = this.getBuses();
    buses.push(bus);
    this.saveBuses(buses);
  }

  // Editar un bus existente
  editBus(busId: number, updatedBus: any): void {
    const buses = this.getBuses();
    const index = buses.findIndex(bus => bus.id === busId);
    if (index !== -1) {
      buses[index] = { ...buses[index], ...updatedBus };
      this.saveBuses(buses);
    }
  }

  // Eliminar un bus
  deleteBus(busId: number): void {
    let buses = this.getBuses();
    buses = buses.filter(bus => bus.id !== busId);
    this.saveBuses(buses);
  }

  constructor(private http : HttpClient){}
  private apiBackend = 'http://localhost:3000'//backend
  async FinAllTrips(pagActual: number, limit: number) {
      try{
        return await this.http.post<DestinosResponse>(`${this.apiBackend}/destinos`, {pagActual, limit}).toPromise()
      } catch (error){
        return null
      }
  }

  asientos: Asientos[] = [
    { id: 1, status: 0 },
    { id: 2, status: 1 },
    { id: 3, status: 0 },
    { id: 4, status: 1 },
    { id: 5, status: 0 },
    { id: 6, status: 0 },
    { id: 7, status: 1 },
    { id: 8, status: 0 },
    { id: 9, status: -1 },
    { id: 10, status: 1 },
    { id: 11, status: 0 },
    { id: 12, status: 0 },
    { id: 13, status: 1 },
    { id: 14, status: 0 },
    { id: 15, status: -1 },
    { id: 16, status: 1 },
    { id: 17, status: 0 },
    { id: 18, status: -1 },
    { id: 19, status: 1 },
    { id: 20, status: 0 },
  ]

  getAsientos(): Asientos[]{
    return this.asientos
  }
}
