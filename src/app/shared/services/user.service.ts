import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateResponse, ImgBBResponse, User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})

export class UserService{
    private apiKeyImages = 'd03db2efb9b5f84b54e691b44c31976d';//key para imagenes
    private apiImages = 'https://api.imgbb.com/1/upload';//api para imagenes
    private apiBackend = 'http://localhost:3000'//backend
    constructor(private http : HttpClient){}
    //subir ala api foto de usuario
    uploadImage(file : File): Observable<ImgBBResponse>{
      const formData = new FormData();
      formData.append('image', file);
      return this.http.post<ImgBBResponse>(`${this.apiImages}?key=${this.apiKeyImages}`, formData)
        .pipe(
          catchError(error => {
            return throwError(error);
          })
        );
    }
    //create user
    async createUser(newUser: Omit<User, 'id'>) {
      try {
        const response = await this.http.post<CreateResponse>(`${this.apiBackend}/usuarios/create-user`, newUser).toPromise()
        return response?.message
      } catch (error) {
        return 'error'
      }
    }   
    //update user
    async updateUser(id: string, updateUser: User) {
      try {
        return await this.http.patch<User>(`${this.apiBackend}/usuarios/update-user/${id}`, updateUser).toPromise()
      } catch (error) {
        return null;
      }
    }
    // Update password
    async updatePassword(id: string, oldPassword: string, newPassword: string) {
      try {
        const body = { id, oldPassword, newPassword }; // Prepara el cuerpo de la solicitud
        const response = await this.http.patch<CreateResponse>(`${this.apiBackend}/usuarios/update-password/${id}`, body).toPromise();
        return response?.message; // Retorna el mensaje o 'success' si no hay mensaje
      } catch (error) {
        return 'error'; // Retorna un mensaje de error
      }
    }
  }
