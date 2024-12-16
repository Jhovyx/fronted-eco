import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Pago } from '../interfaces/pago.inetrface';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

      //ACCEDIENDO ALAS VARIBLES DE CONFIGURACION
      private readonly apiBackend = API_CONFIG.apiBackend;
  
      //INJECTANDO A HttpClient PARA MANEJAR PETICIONES HTTP
      constructor(private http : HttpClient){}
  
      //OBTENER TODOS
      async findAll(){
          return await this.http.get<Pago[]>(`${this.apiBackend}/pago`, { withCredentials: true }).toPromise();
      }
  
      //OBTENER POR ID
      async findById(id: string){
          return await this.http.get<Pago>(`${this.apiBackend}/pago/${id}`, { withCredentials: true }).toPromise();
      }

      //CREAR
      async create(pago: Omit<Pago, 'primaryKey'>){
          return await this.http.post<Pago>(`${this.apiBackend}/pago`, pago, { withCredentials: true }).toPromise();
      }
  
      //ACTUALIZAR
      async update(id: string, pago: Omit<Pago, 'primaryKey'>){
        return await this.http.patch<Pago>(`${this.apiBackend}/pago/${id}`, pago, { withCredentials: true }).toPromise()
      }
}
