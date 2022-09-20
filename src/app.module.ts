import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { TaskModule } from './task/task.module';

@Module({
  imports: [
    /*TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'local',
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
    }),
    TaskModule,*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
