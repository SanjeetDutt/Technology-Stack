import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Password} from "./Password.entity";
import {Role} from "./Role.entity";
import {_BaseEntity} from "./_Base.entity";

@Entity("user")
export class User extends _BaseEntity{

	@PrimaryGeneratedColumn("uuid",{name:"id"})
	id?: string

	@Column("varchar",{nullable:false, name:"name"})
	name: string

	@Column("varchar", {nullable:false, name:"email"})
	email: string

	@OneToMany(()=>Password, password=>password.user)
	passwords?: Password[]

	// @ManyToMany(()=>Role)
	// @JoinTable()
	// roles: Role[] = []



	constructor(name: string, email: string) {
		super()
		this.name = name
		this.email = email
	}
}