export interface userLogin {
  email: string;
  password: string;
}

export interface loginResponse {
  email: string;
  token: string;
}

export interface loginErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export interface userRegister {
  fullName: string;
  email: string;
  password: string;
}
