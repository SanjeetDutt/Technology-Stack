import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { UserEntity,PermissionEntity} from "../index";
import {_BaseEntity} from "../_Base.entity";

@Entity("role")
export class RoleEntity extends _BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id?: string

	@Column()
	name: string

	@ManyToMany(()=>UserEntity, user=>user.roles)
	users?: UserEntity[]

	@ManyToMany(()=>PermissionEntity, permission=>permission.roles)
	@JoinTable({name:"role_permission",joinColumn:{name:"role_id",referencedColumnName:"id"}, inverseJoinColumn:{name:"permission_name",referencedColumnName:"name"}})
	permissions?: PermissionEntity[]

	constructor(name:string){
		super()
		this.name = name;
	}
}