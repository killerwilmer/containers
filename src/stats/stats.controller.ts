import { Controller, Get, Body, Post } from '@nestjs/common';
import { Stats } from '../entity/stats.entity';
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

	@Get('totals')
	async getTotalValues(): Promise<{
		totalDispatchedValue: number;
		totalUndispatchedValue: number;
	}> {
		const totalDispatchedValue =
			await this.statsService.getTotalDispatchedValue();
		const totalUndispatchedValue =
			await this.statsService.getTotalUndispatchedValue();
		return { totalDispatchedValue, totalUndispatchedValue };
	}
}
