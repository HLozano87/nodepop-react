export interface SignUp {
  email: string;
  password: string;
  username: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthUser extends User {
  id: string;
  createdAt: string;
}

export interface CredentialUser {
  email: string;
  password: string;
}

export interface Jwt {
  accessToken: string;
}
