export type UserRole = 'Développeur' | 'Designer' | 'Chef de projet' | 'Testeur';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}
