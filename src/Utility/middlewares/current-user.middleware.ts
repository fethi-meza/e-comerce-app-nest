/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from "@nestjs/common";
import { isArray } from "class-validator";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class CurrentUserMiddewaer implements NestMiddleware{
  [x: string]: any;
  use(req: Request, res: Response, next: NextFunction) {
    
//authorization can be  string or arry in input
const authHeader =  req.headers.authorization ||  req.headers.Authorization ;
if(!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer') ){

//req.currentUser =null ;

}
    next()
    }
}