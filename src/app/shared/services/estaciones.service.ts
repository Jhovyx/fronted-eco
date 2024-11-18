import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estacion } from '../interfaces/estaciones.interface';

@Injectable({
    providedIn: 'root'
})

export class EstacionService{
  //ya esta verificado
    private apiBackend = 'http://localhost:3000/v1/estaciones'//backend
    constructor(private http : HttpClient){}

    //retorna todos
    async findAll(){
        return await this.http.get<Estacion[]>(`${this.apiBackend}`).toPromise();
    }

    //retorna por id
    async findById(id: string){
        return await this.http.get<Estacion>(`${this.apiBackend}/${id}`).toPromise();
    }

    //crear
    async create(estacion: Estacion){
        const response = await this.http.post<Estacion>(`${this.apiBackend}`, estacion).toPromise();
        if(response){
            return response
        }else{
            return 'Ocurrio un error al crear el bus.';
        }
    }

    async update(id: string, bus: Partial<Estacion>){
        const response = await this.http.patch<Estacion>(`${this.apiBackend}/${id}`, bus).toPromise()
        if(response){
          return response
        }else{
          return 'Ocurrio un error al actualizar el bus.';
        }
    }

}