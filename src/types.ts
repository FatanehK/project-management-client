export interface IUser {
  email: string;
  full_name: string | null;
  id: number;
  is_active: boolean | null;
}

export interface IProject {
  admin: IUser;
  description: string | null;
  id: number;
  status: string | null;
  title: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string | null;
  status: string | null;
  due_date: Date | null;
  assigned_to: IUser
}