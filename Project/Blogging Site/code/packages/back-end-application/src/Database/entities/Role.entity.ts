import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User.entity";
import {Permission} from "./Permission.entity";

@Entity()
export class Role {
	@PrimaryGeneratedColumn("uuid")
	id?: string

	@Column()
	name: string

	// @ManyToMany(()=>User)
	// @JoinTable()
	// users: User[] = []

	// @ManyToMany(()=>Permission)
	// @JoinTable()
	// permissions: Permission[] = []

	constructor(name:string){
		this.name = name;
	}
}