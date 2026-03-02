export interface User {
  id: number;
  login: string;
  password: string;
  createdAt: Date;
  role: 'admin' | 'user';
}
