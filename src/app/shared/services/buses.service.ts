import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bus } from '../interfaces/bus.interface';

@Injectable({
    providedIn: 'root'
})

export class BusService{
  //ya esta verificado
    private apiBackend = 'http://localhost:3000/v1/buses'//backend
    constructor(private http : HttpClient){}

    //retorna todos
    async findAll(){
        return await this.http.get<Bus[]>(`${this.apiBackend}`).toPromise();
    }

    //retorna por id
    async findById(id: string){
        return await this.http.get<Bus>(`${this.apiBackend}/${id}`).toPromise();
    }

    //crear
    async create(bus: Bus){
        const response = await this.http.post<Bus>(`${this.apiBackend}`, bus).toPromise();
        if(response){
            return response
        }else{
            return 'Ocurrio un error al crear el bus.';
        }
    }

    async update(id: string, bus: Partial<Bus>){
        const response = await this.http.patch<Bus>(`${this.apiBackend}/${id}`, bus).toPromise()
        if(response){
          return response
        }else{
          return 'Ocurrio un error al actualizar el bus.';
        }
    }

}