import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Stats } from '../entity/stats.entity';

const statsRepositoryMock = {
	save: jest.fn(),
};

describe('StatsController', () => {
	let statsController: StatsController;
	let statsService: StatsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [StatsController],
			providers: [
				StatsService,
				{
					provide: getRepositoryToken(Stats),
					useValue: statsRepositoryMock,
				},
			],
		}).compile();

		statsController = module.get<StatsController>(StatsController);
		statsService = module.get<StatsService>(StatsService);
	});

	it('should be defined', () => {
		expect(statsController).toBeDefined();
	});

	describe('getStats', () => {
		it('should return an array of stats', async () => {
			const statsData: Stats[] = [
				{
					id: 1,
					dispatchedValue: 700,
					undispatchedValue: 300,
					totalBudget: 1000,
				},
				{
					id: 2,
					dispatchedValue: 600,
					undispatchedValue: 400,
					totalBudget: 1000,
				},
			];

			jest.spyOn(statsService, 'findAll').mockResolvedValue(statsData);

			const result = await statsController.getStats();

			expect(result).toEqual(statsData);
		});
	});

	describe('createStats', () => {
		it('should create a new stats record', async () => {
			const statsData = new Stats();
			statsData.dispatchedValue = 700;
			statsData.undispatchedValue = 300;
			statsData.totalBudget = 1000;

			jest.spyOn(statsService, 'create').mockResolvedValue(statsData);

			const createdStats = await statsController.createStats(statsData);

			expect(createdStats).toEqual(statsData);
		});
	});
});
