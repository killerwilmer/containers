import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainerService } from './container/container.service';
import { ContainerController } from './container/container.controller';
import { StatsModule } from './stats/stats.module';
import { Stats } from './entity/stats.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5434,
			username: 'postgres',
			password: '123',
			database: 'kiki',
			entities: [Stats],
			synchronize: true,
		}),
		StatsModule,
	],
	controllers: [AppController, ContainerController],
	providers: [AppService, ContainerService],
})
export class AppModule { }
