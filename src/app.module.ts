import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainerService } from './container/container.service';
import { ContainerController } from './container/container.controller';

@Module({
  imports: [],
  controllers: [AppController, ContainerController],
  providers: [AppService, ContainerService],
})
export class AppModule { }
