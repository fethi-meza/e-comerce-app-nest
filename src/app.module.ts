/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'DB/DB-src';
import { UsersModule } from './users/users.module';

import { CurrentUserMiddleware } from './Utility/middlewares/current-user.middleware';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({path:'*',method:RequestMethod.ALL});
  }


}
