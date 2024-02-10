/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

/* eslint-disable prettier/prettier */
export class UserSingUp{
   // validtion name *_*
    @IsNotEmpty({message :"name can not be null" })
    @IsString({message :"name should be strig" })

     name : string

 // validtion email *_*
     @IsNotEmpty({message :"email can not be empty" })
     @IsEmail({},{message :'Plesed provoid a valid email'})

     email : string 

 // validtion password *_*
     @IsNotEmpty({message :"password  can not be empty" })
     @MinLength(5,{message :'Password minimum characht should be 5'})
     
     password : string

}