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

	addPassword(password:Password){
		if(!this.passwords){
			this.passwords = []
		}
		this.passwords.push(password)
		password.user = this
	}



	constructor(name: string, email: string) {
		super()
		this.name = name
		this.email = email
	}
}