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

export interface asignatura {
  id: number;
  titulo: string;
  instructor: string;
  sala: string;
  nrc: number;
}
