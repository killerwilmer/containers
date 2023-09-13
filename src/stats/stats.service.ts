import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stats } from './stats.entity';

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
}
