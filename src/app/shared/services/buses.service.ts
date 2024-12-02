import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bus } from '../interfaces/bus.interface';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
    providedIn: 'root'
})

export class BusService{
  
    //ACCEDIENDO ALAS VARIBLES DE CONFIGURACION
    private readonly apiBackend = API_CONFIG.apiBackend;

    //INJECTANDO A HttpClient PARA MANEJAR PETICIONES HTTP
    constructor(private http : HttpClient){}

    //OBTENER TODOS
    async findAll(){
        return await this.http.get<Bus[]>(`${this.apiBackend}/buses`, { withCredentials: true }).toPromise();
    }

    //OBTENER POR ID
    async findById(id: string){
        return await this.http.get<Bus>(`${this.apiBackend}/buses/${id}`, { withCredentials: true }).toPromise();
    }

    //CREAR
    async create(bus: Bus){
        return await this.http.post<Bus>(`${this.apiBackend}/buses`, bus, { withCredentials: true }).toPromise();
    }

    //ACTUALIZAR
    async update(id: string, bus: Partial<Bus>){
      return await this.http.patch<Bus>(`${this.apiBackend}/buses/${id}`, bus, { withCredentials: true }).toPromise()
    }

}