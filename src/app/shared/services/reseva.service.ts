import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../interfaces/reserva.interface';
@Injectable({
  providedIn: 'root'
})
export class ReservaService {

      //ACCEDIENDO ALAS VARIBLES DE CONFIGURACION
      private readonly apiBackend = API_CONFIG.apiBackend;
  
      //INJECTANDO A HttpClient PARA MANEJAR PETICIONES HTTP
      constructor(private http : HttpClient){}
  
      //OBTENER TODOS
      async findAll(){
          return await this.http.get<Reserva[]>(`${this.apiBackend}/reservas`, { withCredentials: true }).toPromise();
      }
  
      //OBTENER POR ID
      async findById(id: string){
          return await this.http.get<Reserva>(`${this.apiBackend}/reservas/reserva/${id}`, { withCredentials: true }).toPromise();
      }

      //OBTENER POR ID usuario
      async findByIdUser(id: string){
        return await this.http.get<Reserva[]>(`${this.apiBackend}/reservas/user/${id}`, { withCredentials: true }).toPromise();
    }
  
      //CREAR
      async create(reserva: Reserva){
          return await this.http.post<Reserva>(`${this.apiBackend}/reservas`, reserva, { withCredentials: true }).toPromise();
      }
  
      //ACTUALIZAR
      async update(id: string, reserva: Partial<Reserva>){
        return await this.http.patch<Reserva>(`${this.apiBackend}/reservas/${id}`, reserva, { withCredentials: true }).toPromise()
      }
}
