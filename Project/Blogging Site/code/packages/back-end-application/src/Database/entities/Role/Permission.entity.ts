import {Column, Entity, ManyToMany, PrimaryColumn} from "typeorm";
import {_BaseEntity} from "../_Base.entity";
import {RoleEntity} from "../index";

@Entity("permission")
export class PermissionEntity extends _BaseEntity{

	@PrimaryColumn()
	name: string

	@Column()
	description:string

	@ManyToMany(()=>RoleEntity, role=>role.permissions)
	roles?: RoleEntity[]

	constructor(name:string, description:string) {
		super();
		this.name = name
		this.description = description


	}
}