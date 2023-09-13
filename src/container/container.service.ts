import { Injectable } from '@nestjs/common';
import { Container } from './container.model';

@Injectable()
export class ContainerService {
	selectContainers(budget: number, containers: Container[]): string[] {
		containers.sort((a, b) => b.value - a.value);

		const selectedContainers: string[] = [];
		let currentBudget = budget;

		for (const container of containers) {
			if (container.cost <= currentBudget) {
				selectedContainers.push(container.name);
				currentBudget -= container.cost;
			}
		}

		return selectedContainers;
	}
}
