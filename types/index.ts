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
  nrc: string;
  userEmail: string;
}

export interface EliminarAsignatura {
  id: number;
}

export interface Tarea {
  id: number;
  descripcion: string;
  fechaIngreso: Date;
  fechaTermino: string;
  estado: string;
  asignaturaId: number;
}

export interface CreateTarea {
  descripcion: string;
  idAsignatura: number;
  fechaTermino: string;
}
