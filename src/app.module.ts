/* eslint-disable prettier/prettier */
import { Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'DB/DB-src';
import { UsersModule } from './users/users.module';
import { config } from 'dotenv';
import { CurrentUserMiddewaer } from './Utility/middlewares/current-user.middleware';
import { METHODS } from 'http';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
configure (consumer:CurrentUserMiddewaer){
  consumer.apply(CurrentUserMiddewaer)
  .forRoutes({path : '*' ,method : RequestMethod.ALL})
}


}
