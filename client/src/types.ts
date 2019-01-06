export interface Link {
  id: string;
  description: string;
  url: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface User {
  name: string;
  email: string;
  password: string;
}