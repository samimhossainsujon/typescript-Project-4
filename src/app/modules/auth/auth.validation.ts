import { z } from 'zod';

const UserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    bloogGroup: z.enum(['admin', 'user']),
  }),
});

const ChangePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'current Password is require',
    }),
    newPassword: z.string({ required_error: 'New Password is require' }),
  }),
});

const LoginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is requred' }),
    password: z.string({ required_error: 'password is requred ' }),
  }),
});

export const AuthValidation = {
  UserValidationSchema,
  ChangePasswordValidationSchema,
  LoginValidationSchema,
};
