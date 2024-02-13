/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class UserSignInDto {
    // validtion email *_*
    @IsNotEmpty({message :"email can not be empty" })
    @IsEmail({},{message :'Plesed provoid a valid email'})

    email : string 

// validtion password *_*
    @IsNotEmpty({message :"password  can not be empty" })
    @MinLength(5,{message :'Password minimum characht should be 5'})
    
    password : string
}