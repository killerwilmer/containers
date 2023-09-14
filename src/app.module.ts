import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainerService } from './container/container.service';
import { ContainerController } from './container/container.controller';
import { StatsModule } from './stats/stats.module';
import { Stats } from './entity/stats.entity';
import { SocketModule } from './socket/socket.module';
import { enviroments } from './enviroments';
import config from './config';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath:
				enviroments.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev',
			load: [config],
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [Stats],
			synchronize: false,
		}),
		StatsModule,
		SocketModule,
	],
	controllers: [AppController, ContainerController],
	providers: [AppService, ContainerService],
})
export class AppModule { }
