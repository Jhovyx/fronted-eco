import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { ImgBBResponse, User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})

export class UserService{
    private apiKeyImages = 'd03db2efb9b5f84b54e691b44c31976d';//key para imagenes
    private apiImages = 'https://api.imgbb.com/1/upload';//api para imagenes
    private apiBackend = 'http://localhost:3000/v1/users'//backend

    private userSubject = new BehaviorSubject<User | null>(null); // Estado inicial
    user$: Observable<User | null> = this.userSubject.asObservable();

    constructor(private http : HttpClient){}

    async getUsers() {
      return await this.http.get<User[]>(`${this.apiBackend}`).toPromise();
    }
    
    //ya esta verificado
    
    //update user
    async updateUser(id: string, updateUser: Partial<User>) {
      try {
        const user = await this.http.patch<User>(`${this.apiBackend}/${id}`, updateUser).toPromise()
        if(user){
          this.setUser(user);
          this.userSubject.next(user); // Emitir el nuevo usuario
          return user
        }else{
          return 'Ocurrio un error al actualizar el usuario.';
        }
      } catch (error) {
        if(error instanceof HttpErrorResponse){
          // Verificar si el mensaje está en un idioma diferente al español
          const errorMessage = error.error.message || '';

          const isSpanish = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s,.]+$/.test(errorMessage); 
          
          if (isSpanish) {
            return errorMessage;
          } else {
            return 'Ocurrio un error al actualizar el usuario.';
          }
        }else{
          return 'Ocurrio un error al actulizar el usuario.';
        }
      }
    }
    
    // Update password
    async updatePassword(id: string, oldPassword: string, newPassword: string) {
      try {
        const body = {oldPassword, newPassword }; // Prepara el cuerpo de la solicitud
        const response = await this.http.patch<{ message: string }>(`${this.apiBackend}/password/${id}`, body).toPromise();
        if(response){
          return response.message
        }else{
          return 'Ocurrio un error al actualizar la contraseña.';
        }
      } catch (error) {
        if(error instanceof HttpErrorResponse){
          return error.error.message;
        }else{
          return 'Ocurrio un error al actualizar la contraseña.';
        }
      }
    }
    
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

    //create 
    userAdminId?: string
    userAdmin?: string
    async createUser(newUser: Omit<User, 'primaryKey'>) {
      this.loadUserData();
      if(this.userAdmin && this.userAdmin === 'admin') newUser.userAdminId = this.userAdminId;
      try {
        const response = await this.http.post<{ message: string }>(`${this.apiBackend}`, newUser).toPromise()
        if(response){
          return response.message
        }else{
          return 'Ocurrio un error al crear el usuario.';
        }
      } catch (error) {
        if(error instanceof HttpErrorResponse){
          // Verificar si el mensaje está en un idioma diferente al español
          const errorMessage = error.error.message || '';

          const isSpanish = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s,.]+$/.test(errorMessage); 
          
          if (isSpanish) {
            return errorMessage;
          } else {
            return 'Ocurrio un error al crear el usuario.';
          }
        }else{
          return 'Ocurrio un error al crear el usuario.';
        }
      }
    }   

    async deleteUser(primaryKey: string){
      this.loadUserData();
      if(this.userAdmin === 'admin'){
        try {
          const response = await this.http.patch<{ message: string }>(`${this.apiBackend}/delete/${primaryKey}`, {userAdminId: this.userAdminId}).toPromise()
          console.log(response)
          if(response){
            return response.message
          }else{
            return 'Ocurrio un error al eliminar el usuario.';
          }
        } catch (error) {
          if(error instanceof HttpErrorResponse){
            // Verificar si el mensaje está en un idioma diferente al español
            const errorMessage = error.error.message || '';

            const isSpanish = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s,.]+$/.test(errorMessage); 
            
            if (isSpanish) {
              return errorMessage;
            } else {
              return 'Ocurrio un error al crear el usuario.';
            }
          }else{
            return 'Ocurrio un error al eliminar el usuario.';
          }
        }
      }else{
        return 'Este usuario no esta permitido que realize la accion.';
      }
    }

    //loguin 
  async login(email: string, password: string) {
      try{
          const user = await this.http.post<User>(`${this.apiBackend}/login`, {email, password}).toPromise();
          if (user) {
            this.setUser(user);
            this.userSubject.next(user); // Emitir el nuevo usuario
            return user;
          }
            return 'Ocurrio un error al ingresar al sistema.'
      } catch (error){
        if(error instanceof HttpErrorResponse){
          // Verificar si el mensaje está en un idioma diferente al español
          const errorMessage = error.error.message || '';

          const isSpanish = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s,.]+$/.test(errorMessage); 
          
          if (isSpanish) {
            return errorMessage;
          } else {
            return 'Ocurrio un error al ingresar al sistema.';
          }
        }else{
          return 'Ocurrio un error al ingresar al sistema.';
        }
      }
  }

  //cerrar sesion
  logout(): void {
      sessionStorage.removeItem('user'); // Limpiar el sessionStorage
      this.userSubject.next(null);
  }

  //almacenar en sesion storage
  private setUser(user: User){
    sessionStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  private loadUserData(): void {
    const data = sessionStorage.getItem('user');
    if (data) {
      const userx: User = JSON.parse(data);
      if(userx){
        this.userAdminId = userx.primaryKey; 
        this.userAdmin = userx.userType; 
      }
    }
  }
  
}
