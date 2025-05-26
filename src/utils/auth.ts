export interface CreatedUser {
  email: string;
  password: string;
  username: string;
  name: string;
}

export interface CreatedUserResponse extends User {
  _id: string;
  createdAt: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
}

export interface CredentialUser {
  email: string;
  password: string;
}

export interface AuthResponseUser {
  success: boolean;
  token: string;
  login: User;
}

export interface Jwt {
  token: string;
}
