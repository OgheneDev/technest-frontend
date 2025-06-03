export interface RegisterCredentials {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: 'user',
}

export interface LoginCredentials {
    email: string,
    password: string
}

export interface LoginResponse {
    token: string;
}

export interface ResetPasswordCredentials {
    password: string;
}

export interface UpdatePasswordCredentials {
    currentPassword: string;
    newPassword: string;
}
  
export interface UpdateDetailsCredentials {
    username?: string;
    bio?: string;
}
  
export interface DeleteAccountCredentials {
    password: string;
}