export interface Auth {
  email: string;
  password: string;
}

export interface User {
  email: string;
  fullName: string;
  user: User;
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

export interface EliminarTarea {
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

export interface Departamento {
  departamento: number;
  ultima_medicion: string;
  temperatura: number;
}

export interface CreateTarea {
  descripcion: string;
  idAsignatura: number;
  fechaTermino: string;
}

export interface UpdateTarea {
  descripcion: string;
  fechaTermino: string;
  estado: string;
}
