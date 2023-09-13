import { Controller, Post, Body } from '@nestjs/common';
import { ContainerService } from './container.service';
import { Stats } from '../entity/stats.entity';
import { StatsService } from '../stats/stats.service';
import { CreateShipmentDto } from '../dto/create-shipment.dto';

@Controller('containers')
export class ContainerController {
	constructor(
		private readonly containerService: ContainerService,
		private readonly statsService: StatsService,
	) { }

	@Post()
	async selectContainers(
		@Body() requestData: CreateShipmentDto,
	): Promise<string[]> {
		const { budget, containers } = requestData;
		const selectedContainers = this.containerService.selectContainers(
			budget,
			containers,
		);

		const dispatchedValue = selectedContainers.reduce(
			(total, containerName) => {
				const selectedContainer = containers.find(
					(c) => c.name === containerName,
				);
				return total + (selectedContainer ? selectedContainer.value : 0);
			},
			0,
		);

		const undispatchedValue = containers.reduce((total, container) => {
			if (!selectedContainers.includes(container.name)) {
				return total + container.value;
			}
			return total;
		}, 0);

		const totalBudget = budget;

		const stats = new Stats();
		stats.dispatchedValue = dispatchedValue;
		stats.undispatchedValue = undispatchedValue;
		stats.totalBudget = totalBudget;

		await this.statsService.create(stats);

		return selectedContainers;
	}
}
