import {Column} from "typeorm";

export abstract class _BaseEntity {

	@Column("timestamp",{default: new Date(), name:"created_at"})
	createdAt: Date;

	protected constructor(date:Date = new Date()){
		this.createdAt = date
	}
}