import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Activity } from "../interfaces/activity.interface";

@Injectable({
    providedIn: 'root'
})

export class ActivityService {
    private apiBackend = 'http://localhost:3000/v1/activities'//backend
    constructor(private http : HttpClient){}
    async getActivity() {
        return await this.http.get<Activity[]>(`${this.apiBackend}`).toPromise();
    }

}