import { Status } from "./contants";

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
  status: StatusType;
  title: string;
}

export type StatusType = keyof typeof Status;

export interface ITask {
  id: number;
  title: string;
  description: string | null;
  status: StatusType;
  due_date: string | null;
  assigned_to: IUser,
  project_id: number,
}