export interface Link {
  id: string;
  url: string;
  description: string;
  votes: Vote[];
  postedBy: User;
  createdAt: Date;
}

export interface Feed {
  links: Link[];
  count: number;
}

export interface Vote {
  link: Link;
  user: User[];
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