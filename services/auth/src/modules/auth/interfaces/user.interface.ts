import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}