import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainerService } from './container/container.service';
import { ContainerController } from './container/container.controller';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5434,
			username: 'postgres',
			password: '123',
			database: 'kiki',
			entities: [],
			synchronize: true, // Esto debería ser 'false' en producción
		}),
	],
	controllers: [AppController, ContainerController],
	providers: [AppService, ContainerService],
})
export class AppModule { }
