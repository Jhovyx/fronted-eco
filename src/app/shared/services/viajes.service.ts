import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viaje } from '../interfaces/viaje.interface';

@Injectable({
    providedIn: 'root'
})

export class ViajesService{
  //ya esta verificado
    private apiBackend = 'http://localhost:3000/v1/viajes'//backend
    constructor(private http : HttpClient){}

    //retorna todos
    async findAll(){
        return await this.http.get<Viaje[]>(`${this.apiBackend}`).toPromise();
    }

    //retorna por id
    async findById(id: string){
        return await this.http.get<Viaje>(`${this.apiBackend}/${id}`).toPromise();
    }

    //crear
    async create(viaje: Viaje){
        const response = await this.http.post<Viaje>(`${this.apiBackend}`, viaje).toPromise();
        if(response){
            return response
        }else{
            return 'Ocurrio un error al crear el Viaje.';
        }
    }

    async update(id: string, viaje: Partial<Viaje>){
        const response = await this.http.patch<Viaje>(`${this.apiBackend}/${id}`, viaje).toPromise()
        if(response){
          return response
        }else{
          return 'Ocurrio un error al actualizar el Viaje.';
        }
    }

}