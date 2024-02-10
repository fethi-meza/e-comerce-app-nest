/* eslint-disable prettier/prettier */
import { UserEntity } from "./entities/user.entity";
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSingUpDto } from './dto/user-singup.dto';
import { promises } from 'dns';

@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}



  
  //singup user 
@Post('singup')
 async singup(@Body() UserSingUpDto:UserSingUpDto): Promise<{user :UserEntity}>{
  return { user :await this.usersService.singup(UserSingUpDto)}
 
}


  @Post()
   
  create(@Body() createUserDto: CreateUserDto) {
    //return this.usersService.create(createUserDto);
    return 'hi'
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
