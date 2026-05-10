import {Entity, ManyToOne, PrimaryColumn, JoinColumn} from "typeorm";
import {User} from "./User.entity";
import {_BaseEntity} from "./_Base.entity";

@Entity()
export class Password extends _BaseEntity{

	@PrimaryColumn("varchar")
	password: string

	@ManyToOne(() => User)
	@JoinColumn({name:"user_id"})
	user?:User

	constructor( password: string){
		super()
		this.password = password;
	}
}