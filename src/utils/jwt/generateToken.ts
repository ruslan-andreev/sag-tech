import * as jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';

const secretKey: string = process.env.JWT_SECRET;

export function generateToken(user: Prisma.UserCreateManyInput): string {

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      secretKey,
      { expiresIn: process.env.ACCESS_TOKEN_EXP },
    );

    return token;
}