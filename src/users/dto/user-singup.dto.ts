/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsString} from "class-validator";
import { UserSignInDto } from "./user-signin.dto";

/* eslint-disable prettier/prettier */
export class UserSingUpDto extends UserSignInDto{
   // validtion name *_*
    @IsNotEmpty({message :"name can not be null" })
    @IsString({message :"name should be strig" })

     name : string
}