import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estacion } from '../interfaces/estaciones.interface';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
    providedIn: 'root'
})

export class EstacionService{

    //ACCEDIENDO ALAS VARIBLES DE CONFIGURACION
    private readonly apiBackend = API_CONFIG.apiBackend;

    //INJECTANDO A HttpClient PARA MANEJAR PETICIONES HTTP
    constructor(private http : HttpClient){}

    //OBTENER TODOS
    async findAll(){
        return await this.http.get<Estacion[]>(`${this.apiBackend}/estaciones`, { withCredentials: true }).toPromise();
    }

    //OBTENER TODOS LOS ACTIVOS
    async findAllTrue(){
        return await this.http.get<Estacion[]>(`${this.apiBackend}/estaciones/estacion`, { withCredentials: true }).toPromise();
    }

    //OBTENER POR ID
    async findById(id: string){
        return await this.http.get<Estacion>(`${this.apiBackend}/estaciones/estacion/${id}`, { withCredentials: true }).toPromise();
    }

    //CREAR
    async create(estacion: Estacion){
        return await this.http.post<Estacion>(`${this.apiBackend}/estaciones`, estacion, { withCredentials: true }).toPromise();
    }

    //ACTUALIZAR
    async update(id: string, bus: Partial<Estacion>){
      return await this.http.patch<Estacion>(`${this.apiBackend}/estaciones/${id}`, bus, { withCredentials: true }).toPromise()
    }

}