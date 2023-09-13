import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats } from '../entity/stats.entity';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Stats])],
	providers: [StatsService],
	controllers: [StatsController],
	exports: [StatsService],
})
export class StatsModule { }
