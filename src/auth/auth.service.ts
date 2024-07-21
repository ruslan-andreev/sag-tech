import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { LoginAuthDto } from './dto/loginAuthDto';
import { generateToken } from 'src/utils/jwt/generateToken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAuthDto: Prisma.UserCreateInput) {
    const hashPassword = await bcrypt.hash(createAuthDto.password, 10);
    const user: Prisma.UserCreateInput = {...createAuthDto, password: hashPassword,}
    return this.databaseService.user.create({ data: user })
  }
 
  async login(loginAuthDto: LoginAuthDto) {
    const userDb: Prisma.UserCreateManyInput = await this.databaseService.user.findUnique({
      where: {
        email: loginAuthDto.email
      }    
    });
    
    if (!userDb) {
      throw new Error('User not found');
    }

    const passwordValid = await bcrypt.compare(loginAuthDto.password, userDb.password);

    if (!passwordValid) {
      throw new Error('Invalid password');
    }

    const token: string = generateToken(userDb)
    
    return { token }
  }
  
}
