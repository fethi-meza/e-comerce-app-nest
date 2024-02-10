/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSingUpDto } from './dto/user-singup.dto';
import {hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}


//singup new user 
   async singup(UserSingUpDto: UserSingUpDto): Promise<UserEntity> {
//try to find if this email exsits
    const UserExsits = await this.findUsreByEmail(UserSingUpDto.email)
    if (UserExsits) throw  new BadRequestException('Email not exsits pls try agine or create new account')

    //hashing the  password 

    UserSingUpDto.password = await hash(UserSingUpDto.password,10)


    // create new User
    let user = this.usersRepository.create(UserSingUpDto);

    //save the new usre in DB
    user = await this.usersRepository.save(user)
    delete user.password
    return user ;
  }


  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


//try to find  this email if Exsits in DB
  async findUsreByEmail(email :string){

return this.usersRepository.findOneBy({email})
  }
}
