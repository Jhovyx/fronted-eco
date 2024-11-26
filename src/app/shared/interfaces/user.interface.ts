export interface User {
  primaryKey: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  phoneNumber: string;
  email: string;
  password?: string;
  profilePictureUrl?: string;
  userType?: string;
  userAdminId?: string;
  createdAt?: number;
  updatedAt?: number;
  estado?: boolean;
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

  export interface UserResponse {
    message: string;
    userType: string;
  }