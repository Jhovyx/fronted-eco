import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Activity } from "../interfaces/activity.interface";
import { API_CONFIG } from "../../config/api.config";

@Injectable({
    providedIn: 'root'
})

export class ActivityService {
    //ACCEDIENDO ALAS VARIBLES DE CONFIGURACION
    private readonly apiBackend = API_CONFIG.apiBackend;

    //INJECTANDO A HttpClient PARA MANEJAR PETICIONES HTTP
    constructor(private http : HttpClient){}

    //OBTENER TODAS
    async getActivity() {
        return await this.http.get<Activity[]>(`${this.apiBackend}/activities`, { withCredentials: true }).toPromise();
    }
}