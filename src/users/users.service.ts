import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.user.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      }
    });
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: {
        id
      },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.databaseService.user.deleteMany({
      where: {
        id,
      }
    })
  }
}
