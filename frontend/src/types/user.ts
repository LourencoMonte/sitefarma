export interface User {
  id: string;
  name: string;
  email: string;
  perfil: 'admin' | 'user';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  perfil?: 'admin' | 'user';
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  perfil: 'admin' | 'user';
}