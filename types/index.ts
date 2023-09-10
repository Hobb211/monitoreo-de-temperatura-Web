export interface Auth {
  email: string;
  password: string;
}

export interface User {
  email: string;
  token: string;
}

export interface userRegister {
  fullName: string;
  email: string;
  password: string;
}

export interface Asignatura {
  id: number;
  titulo: string;
  instructor: string;
  sala: string;
  nrc: number;
}

export interface CreateAsignatura {
  titulo: string;
  instructor: string;
  sala: string;
  nrc: number;
}
