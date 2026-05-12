import {datasource} from "../datasource";
import {UserEntity,PasswordEntity} from "../entities";


export const getAllUserByEmail = async (email: string) => {
	return await datasource.getRepository(UserEntity).find({
		where: { email },
		relations:{
			passwords:true
		}
	})
}

export const signupNewUser = async ({email, password, name}:{email:string, password:string, name:string})=>{
	const newUser = new UserEntity(name,email)
	const newPassword = new PasswordEntity(password)
	newUser.addPassword(newPassword)

	await datasource.getRepository(UserEntity).save(newUser)
	await datasource.getRepository(PasswordEntity).save(newPassword)
}