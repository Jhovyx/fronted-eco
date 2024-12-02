import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viaje } from '../interfaces/viaje.interface';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
    providedIn: 'root'
})

export class ViajesService{
  
    //ACCEDIENDO ALAS VARIBLES DE CONFIGURACION
    private readonly apiBackend = API_CONFIG.apiBackend;

    //INJECTANDO A HttpClient PARA MANEJAR PETICIONES HTTP
    constructor(private http : HttpClient){}

    //OBTENER TODOS
    async findAll(){
        return await this.http.get<Viaje[]>(`${this.apiBackend}/viajes`, { withCredentials: true }).toPromise();
    }

    //IBTENR POR ID
    async findById(id: string){
        return await this.http.get<Viaje>(`${this.apiBackend}/viajes/${id}`, { withCredentials: true }).toPromise();
    }

    //CREAR
    async create(viaje: Omit<Viaje, 'primaryKey'>){
        return await this.http.post<Viaje>(`${this.apiBackend}/viajes`, viaje, { withCredentials: true }).toPromise();
    }

    //ACTULIZAR
    async update(id: string, viaje: Partial<Viaje>){
        return await this.http.patch<Viaje>(`${this.apiBackend}/viajes/${id}`, viaje, { withCredentials: true }).toPromise()
    }

}