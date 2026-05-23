import {Entity, ManyToOne, PrimaryColumn, JoinColumn} from "typeorm";
import {UserEntity} from "../index";
import {_BaseEntity} from "../_Base.entity";

@Entity("password")
export class PasswordEntity extends _BaseEntity{

	@PrimaryColumn("varchar")
	password: string

	@ManyToOne(() => UserEntity)
	@JoinColumn({name:"user_id"})
	user?:UserEntity

	constructor( password: string){
		super()
		this.password = password;
	}
}