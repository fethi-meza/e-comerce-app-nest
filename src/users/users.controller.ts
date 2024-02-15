/* eslint-disable prettier/prettier */



import { UserEntity } from "./entities/user.entity";

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
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSingUpDto } from './dto/user-singup.dto';

import { UserSignInDto } from "./dto/user-signin.dto";
import { CurrentUser } from './../Utility/decorators/current-user.decorator';



@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}



  
  //singup user 
@Post('sigup')
 async singup(@Body() userSingUpDto:UserSingUpDto): Promise<{user :UserEntity}>{
  return { user :await this.usersService.singup(userSingUpDto)}
 
}

//signin User
  @Post('signin')
  async Signin(@Body() userSignInDto :UserSignInDto): Promise<{
    accessToken: string;
    user: UserEntity;
}>{
const user=  await this.usersService.signin(userSignInDto)
 const accessToken = await this.usersService.accessToken(user)
 return {accessToken,user};
}




//get all users
  @Get('all')
 async findAll() : Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }
// get user  by id   
  @Get(':id')
 async findOne(@Param('id') id: string) : Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

// get my profile (current uesr )

  @Get('me')
  getProfile(@CurrentUser() currentUser :UserEntity){
return currentUser;
  }

}
