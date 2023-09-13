import { Controller, Post, Body } from '@nestjs/common';
import { ContainerService } from './container.service';

@Controller('containers')
export class ContainerController {
	constructor(private readonly containerService: ContainerService) { }

	@Post('select')
	async selectContainers(@Body() requestData: any): Promise<string[]> {
		const { budget, containers } = requestData;
		return this.containerService.selectContainers(budget, containers);
	}
}
