import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Asiento } from '../interfaces/asiento.interface';

@Injectable({
    providedIn: 'root'
})

export class AsientoService{
  
    //ACCEDIENDO ALAS VARIBLES DE CONFIGURACION
    private readonly apiBackend = API_CONFIG.apiBackend;

    //INJECTANDO A HttpClient PARA MANEJAR PETICIONES HTTP
    constructor(private http : HttpClient){}

    //OBTENER POR ID
    async findById(id: string){
        return await this.http.get<Asiento[]>(`${this.apiBackend}/asientos/bus/${id}`, { withCredentials: true }).toPromise();
    }

    //ACTUALIZAR
    async select(id: string, asiento: Partial<Asiento>){
      return await this.http.patch<Asiento>(`${this.apiBackend}/asientos/seleccion/${id}`, asiento, { withCredentials: true }).toPromise()
    }

    //ACTUALIZAR
    async desselect(id: string, asiento: Partial<Asiento>){
      return await this.http.patch<Asiento>(`${this.apiBackend}/asientos/deseleccionar/${id}`, asiento, { withCredentials: true }).toPromise()
    }

}