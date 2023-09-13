import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from './stats.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Stats } from '../entity/stats.entity';

describe('StatsService', () => {
	let statsService: StatsService;
	let statsRepository: Repository<Stats>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				StatsService,
				{
					provide: getRepositoryToken(Stats),
					useClass: Repository,
				},
			],
		}).compile();

		statsService = module.get<StatsService>(StatsService);
		statsRepository = module.get<Repository<Stats>>(getRepositoryToken(Stats));
	});

	it('should be defined', () => {
		expect(statsService).toBeDefined();
	});

	describe('create', () => {
		it('should create a new stats record', async () => {
			const statsData = new Stats();
			statsData.dispatchedValue = 700;
			statsData.undispatchedValue = 300;
			statsData.totalBudget = 1000;

			const saveSpy = jest
				.spyOn(statsRepository, 'save')
				.mockResolvedValue(statsData);

			const createdStats = await statsService.create(statsData);

			expect(createdStats).toEqual(statsData);
			expect(saveSpy).toHaveBeenCalledWith(statsData);
		});
	});
});
