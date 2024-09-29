export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  password: string; // Opcional si el backend lo maneja
  phone_number: string;
  document_type: string;
  document_number: string;
  profile_picture_url?: string;
  cargo?: string;
  estado?: number;
  // Otros campos según tu base de datos
}



  //interface de respuesta de imgBB
  export interface ImgBBResponse {
    data: {
      url: string;
      display_url: string;
      size: number;
      expiration: number;
      image: {
        filename: string;
        name: string;
        mime: string;
        extension: string;
        url: string;
      };
    };
    success: boolean;
    status: number;
  }
  
  //respuesta de creacion de usuario
  export interface CreateResponse{
    message: string
  }