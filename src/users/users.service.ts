/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSingUpDto } from './dto/user-singup.dto';
import {hash  , compare} from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}


//singup new user 
   async singup(userSingUpDto: UserSingUpDto): Promise<UserEntity> {
//try to find if this email exsits
    const UserExsits = await this.findUsreByEmail(userSingUpDto.email)
    if (UserExsits) throw  new BadRequestException('Email not exsits pls try agine or create new account')

    //hashing the  password 

    userSingUpDto.password = await hash(userSingUpDto.password,10)


    // create new User
    let user = this.usersRepository.create(userSingUpDto);

    //save the new usre in DB and  not show the paswrod when show the respons
    user = await this.usersRepository.save(user)
    delete user.password
    return user ;
  }

//signin user 
async signin(userSignInDto :UserSignInDto): Promise<UserEntity>{
//to show the password when send the respons
  const UserExsits = await this.usersRepository.createQueryBuilder('users').addSelect('users.password').where('users.email=:email',{email:userSignInDto.email}).getOne();
  
  if (!UserExsits) throw  new BadRequestException('Bad creadentials')

  // compation password between UserExsits and the input password 
  const matchPassword =  await compare(userSignInDto.password ,UserExsits.password)

  if(!matchPassword)  throw  new BadRequestException('Bad creadentials')

  delete UserExsits.password;
  return  UserExsits ;
}  


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }



  //find all users 

 async findAll() :  Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }


// fin user by id 

 async findOne(id: number): Promise<UserEntity> {
   const user = await this.usersRepository.findOneBy({id})
   if(!user) throw  new NotFoundException("User not found !!")
   return user ;
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

//accseeTooken

async accessToken(user:UserEntity){
return sign({
  id:user.id,email:user.email,password:user.password},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_TIME}) 


}

}
