export type TuserRole = 'admin' | 'user';

interface PasswordChange {
  password: string;
  timestamp: Date;
}

export interface Tuser {
  username: string;
  email: string;
  password: string;
  role: TuserRole;
  createdAt: Date;
  updatedAt: Date;
  currentPassword?: string;
  newPassword?: string;
  token?: string;
  passwordChangeHistory?: PasswordChange[];
}
