import { ContainerService } from './container.service';
import { ContainerDto } from '../dto/create-shipment.dto';

describe('ContainerService', () => {
	let containerService: ContainerService;

	beforeEach(() => {
		containerService = new ContainerService();
	});

	it('should be defined', () => {
		expect(containerService).toBeDefined();
	});

	describe('selectContainers', () => {
		it('should select containers that maximize value within the budget', () => {
			const budget = 1000;
			const containers: ContainerDto[] = [
				{ name: 'A', cost: 800, value: 500 },
				{ name: 'B', cost: 300, value: 200 },
				{ name: 'C', cost: 100, value: 300 },
			];

			const selectedContainers = containerService.selectContainers(
				budget,
				containers,
			);

			expect(selectedContainers).toEqual(['A', 'C']);
		});

		it('should handle an empty list of containers', () => {
			const budget = 1000;
			const containers: ContainerDto[] = [];

			const selectedContainers = containerService.selectContainers(
				budget,
				containers,
			);

			expect(selectedContainers).toEqual([]);
		});

		it('should handle a budget that cannot afford any container', () => {
			const budget = 200;
			const containers: ContainerDto[] = [
				{ name: 'A', cost: 800, value: 500 },
				{ name: 'B', cost: 300, value: 200 },
				{ name: 'C', cost: 300, value: 300 },
			];

			const selectedContainers = containerService.selectContainers(
				budget,
				containers,
			);

			expect(selectedContainers).toEqual([]);
		});
	});
});
