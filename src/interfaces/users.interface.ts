export interface User {
  id: number;
  email: string;
  nick: string;
  password: string;
  provider: string;
  snsId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  Followers: User[];
  Followings: User[];
}
