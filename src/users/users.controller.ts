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
import { UserSignInDto } from "./dto/user-signin.dto";

@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}



  
  //singup user 
@Post('sigup')
 async singup(@Body() userSingUpDto:UserSingUpDto): Promise<{user :UserEntity}>{
  return { user :await this.usersService.singup(userSingUpDto)}
 
}

//signin User
  @Post('sigin')
  async Signin(@Body() userSignInDto :UserSignInDto): Promise<{
    accessToken: string;
    user: UserEntity;
}>{

const user=  await this.usersService.signin(userSignInDto)
 const accessToken = await this.usersService.accessToken(user)
 return {accessToken,user};
}




   
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
