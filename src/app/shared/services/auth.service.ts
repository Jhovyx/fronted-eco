import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    constructor(private http : HttpClient){}
    private apiBackend = 'http://localhost:3000'//backend
    async login(email: string, password: string) {
        try{
            return await this.http.post<User>(`${this.apiBackend}/auth/login`, {email, password}).toPromise()
        } catch (error){
            return null
        }
    }
}