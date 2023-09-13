import { Test, TestingModule } from '@nestjs/testing';
import { ContainerController } from './container.controller';
import { ContainerService } from './container.service';
import { StatsService } from '../stats/stats.service';
import { SocketGateway } from '../socket/socket.gateway';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { Stats } from '../entity/stats.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { io } from 'socket.io-client';

const statsRepositoryMock = {
	save: jest.fn(),
};

describe('ContainerController', () => {
	let containerController: ContainerController;
	let containerService: ContainerService;
	let statsService: StatsService;
	let socketGateway: SocketGateway;
	let socket;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ContainerController],
			providers: [
				ContainerService,
				StatsService,
				SocketGateway,
				{
					provide: getRepositoryToken(Stats),
					useValue: statsRepositoryMock,
				},
			],
		}).compile();

		containerController = module.get<ContainerController>(ContainerController);
		containerService = module.get<ContainerService>(ContainerService);
		statsService = module.get<StatsService>(StatsService);
		socketGateway = module.get<SocketGateway>(SocketGateway);

		const app = module.createNestApplication();
		app.useWebSocketAdapter(new IoAdapter(app));
		await app.init();

		socket = io('http://localhost:3000');
	});

	afterEach(() => {
		socket.close();
	});

	it('should be defined', () => {
		expect(containerController).toBeDefined();
	});

	describe('selectContainers', () => {
		it('should select containers and create stats', async () => {
			const requestData: CreateShipmentDto = {
				budget: 1000,
				containers: [
					{ name: 'A', cost: 800, value: 500 },
					{ name: 'B', cost: 300, value: 200 },
					{ name: 'C', cost: 300, value: 300 },
				],
			};

			const selectedContainers = ['A'];
			const dispatchedValue = 500;
			const undispatchedValue = 500;
			const totalBudget = 1000;
			const stats = new Stats();
			stats.dispatchedValue = dispatchedValue;
			stats.undispatchedValue = undispatchedValue;
			stats.totalBudget = totalBudget;

			jest
				.spyOn(containerService, 'selectContainers')
				.mockReturnValue(selectedContainers);
			jest.spyOn(statsService, 'create').mockResolvedValue(stats);

			const emitContainerSelectionSpy = jest.spyOn(
				socketGateway,
				'emitContainerSelection',
			);

			const result = await containerController.selectContainers(requestData);

			expect(result).toEqual(selectedContainers);
			expect(emitContainerSelectionSpy).toHaveBeenCalledWith(
				selectedContainers,
			);
			expect(statsService.create).toHaveBeenCalledWith(stats);
		});
	});
});
