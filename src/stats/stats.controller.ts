import { Controller, Get, Body, Post } from '@nestjs/common';
import { Stats } from './stats.entity';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
	constructor(private readonly statsService: StatsService) { }

	@Get()
	async getStats(): Promise<Stats[]> {
		return this.statsService.findAll();
	}

	@Post()
	async createStats(@Body() statsData: Stats): Promise<Stats> {
		return this.statsService.create(statsData);
	}
}
