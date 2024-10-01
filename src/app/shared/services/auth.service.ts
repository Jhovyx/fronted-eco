import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    constructor(private http : HttpClient){}
    private apiBackend = 'http://localhost:3000'//backend
    private userSubject = new BehaviorSubject<User | null> (null)
    user$ = this.userSubject.asObservable()
    async login(email: string, password: string) {
        try{
            const user = await this.http.post<User>(`${this.apiBackend}/auth/login`, {email, password}).toPromise()
            if(user){
                this.userSubject.next(user)
            }
            return user
        } catch (error){
            return null
        }
    }
    logout(): void {
        sessionStorage.removeItem('user'); // Limpiar el sessionStorage
        this.userSubject.next(null); // Emitir null para actualizar el estado
    }
}