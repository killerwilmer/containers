import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Stats {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'numeric', default: 0 })
	dispatchedValue: number;

	@Column({ type: 'numeric', default: 0 })
	undispatchedValue: number;

	@Column({ type: 'numeric', default: 0 })
	totalBudget: number;
}
