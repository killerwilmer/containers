import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stats } from '../entity/stats.entity';

@Injectable()
export class StatsService {
	constructor(
		@InjectRepository(Stats)
		private readonly statsRepository: Repository<Stats>,
	) { }

	async create(stats: Stats): Promise<Stats> {
		return this.statsRepository.save(stats);
	}

	async findAll(): Promise<Stats[]> {
		return this.statsRepository.find();
	}

	async getTotalDispatchedValue(): Promise<number> {
		const allStats = await this.statsRepository.find();
		const totalDispatchedValue = allStats.reduce(
			(total, stat) => total + Number(stat.dispatchedValue),
			0,
		);
		console.log(totalDispatchedValue);
		return Number(totalDispatchedValue);
	}

	async getTotalUndispatchedValue(): Promise<number> {
		const allStats = await this.statsRepository.find();
		const totalUndispatchedValue = allStats.reduce(
			(total, stat) => total + Number(stat.undispatchedValue),
			0,
		);
		console.log(totalUndispatchedValue);
		return totalUndispatchedValue;
	}
}
