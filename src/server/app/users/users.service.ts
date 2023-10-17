import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async update(
    id: string,
    updateUserDto: Partial<UpdateUserDto>,
  ) {
    const chosenUser = await this.findOne({where: {id: Number(id)}});

    if(!chosenUser) throw('no user found');

    return this.usersRepository.save({
      id: Number(id),
      ...chosenUser,
      ...updateUserDto
    });
  }

  findOne(params: FindOneOptions<User> = {}) {
    return this.usersRepository.findOne(params);
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: {username }});
  }

  findAll(params: FindManyOptions<User> = {}) {
    return this.usersRepository.find(params);
  }
}
