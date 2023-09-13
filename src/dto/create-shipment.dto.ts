import {
	IsNumber,
	IsArray,
	ValidateNested,
	IsString,
	IsNotEmpty,
	IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ContainerDto {
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	cost: number;

	@IsNumber()
	@IsNotEmpty()
	value: number;

	@IsString()
	@IsNotEmpty()
	name: string;
}

export class CreateShipmentDto {
	@IsNumber()
	@IsNotEmpty()
	budget: number;

	@IsArray()
	@IsNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => ContainerDto)
	containers: ContainerDto[];
}
