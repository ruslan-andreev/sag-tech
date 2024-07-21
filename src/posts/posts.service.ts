import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {

  constructor(private readonly databaseService: DatabaseService) {}

  create(createPostDto: Prisma.PostCreateInput) {
    return this.databaseService.post.create({ data:createPostDto });
  }

  findAll() {
    return this.databaseService.post.findMany({});
  }

  findOne(id: number) {
    return this.databaseService.post.findUnique({
      where: {
        id,
      }
    });
  }

  update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    return this.databaseService.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    });
  }
  
  remove(id: number) {
    return this.databaseService.post.deleteMany({
      where: {
        id,
      }
    });
  }
}