import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { ImgBBResponse, User, UserResponse } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})

export class UserService{
  //ya esta verificado
    private apiKeyImages = 'd03db2efb9b5f84b54e691b44c31976d';//key para imagenes
    private apiImages = 'https://api.imgbb.com/1/upload';//api para imagenes
    private apiBackend = 'http://localhost:3000/v1/users'//backend

    private userSubject = new BehaviorSubject<User | null>(null); // Estado inicial
    user$: Observable<User | null> = this.userSubject.asObservable();

    constructor(private http : HttpClient){}
    
    async getUsers() {
      return await this.http.get<User[]>(`${this.apiBackend}`).toPromise();
    }
    
    async getUserById(id: string) {
      return await this.http.get<User>(`${this.apiBackend}/${id}`).toPromise();
    }
    
    //update user
    async updateUser(id: string, updateUser: Partial<User>) {
        const user = await this.http.patch<User>(`${this.apiBackend}/${id}`, updateUser).toPromise()
        if(user){
          this.setUser(user);
          this.userSubject.next(user); // Emitir el nuevo usuario
          return user
        }else{
          return 'Ocurrio un error al actualizar el usuario.';
        }
    }

    //update status
    async updateUserStatus(id: string, updateUser: Partial<User>) {
      const user = await this.http.patch<User>(`${this.apiBackend}/${id}`, updateUser).toPromise()
      if(user){
        return user
      }else{
        return 'Ocurrio un error al actualizar el usuario.';
      }
    }
    
    // Update password
    async updatePassword(id: string, oldPassword: string, newPassword: string) {
        const body = {oldPassword, newPassword }; // Prepara el cuerpo de la solicitud
        const response = await this.http.patch<{ message: string }>(`${this.apiBackend}/password/${id}`, body).toPromise();
        if(response){
          return response.message
        }else{
          return 'Ocurrio un error al actualizar la contraseña.';
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
        const response = await this.http.post<{ message: string }>(`${this.apiBackend}`, newUser).toPromise()
        if(response){
          return response.message
        }else{
          return 'Ocurrio un error al crear el usuario.';
        }
    }   

    //loguin
    async login(email: string, password: string, recaptchaResponse: string) {
      try {
        const result = await this.http.post<UserResponse>(`${this.apiBackend}/login`, { email, password, recaptchaResponse }, { withCredentials: true }).toPromise();
        const user = result?.user
        if (user) {
          this.setUser(user);
          this.userSubject.next(user); // Emitir el nuevo usuario
          return user;
        } else {
          throw new Error('Ocurrió un error al ingresar al sistema.');
        }
      } catch (error) {
        // Lanza la excepción para que el componente lo maneje
        throw new Error('Credenciales incorrectas o problema con el servidor.');
      }
    }
    

  //cerrar sesion
  logout(): void {
          // Limpiar el sessionStorage
      sessionStorage.removeItem('user');
      this.userSubject.next(null);
      this.logoutUser();
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

  //cerrar sesion en backend
  async logoutUser(){
    await this.http.get<{ message: string }>(`${this.apiBackend}/logout`, { withCredentials: true }).toPromise();
  }
}
