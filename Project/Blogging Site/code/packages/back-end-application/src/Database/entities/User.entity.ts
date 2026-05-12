import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PasswordEntity,RoleEntity} from ".";
import {_BaseEntity} from "./_Base.entity";

@Entity("user")
export class UserEntity extends _BaseEntity{

	@PrimaryGeneratedColumn("uuid",{name:"id"})
	id?: string

	@Column("varchar",{nullable:false, name:"name"})
	name: string

	@Column("varchar", {nullable:false, name:"email"})
	email: string

	@OneToMany(()=>PasswordEntity, password=>password.user)
	passwords?: PasswordEntity[]

	@ManyToMany(()=>RoleEntity, role=>role.users)
	@JoinTable({name:"user_role",joinColumn:{name:"user_id",referencedColumnName:"id"},inverseJoinColumn:{name:"role_id", referencedColumnName:"id"}})
	roles?: RoleEntity[]

	addPassword(password:PasswordEntity){
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