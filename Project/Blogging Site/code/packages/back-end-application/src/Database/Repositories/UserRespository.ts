import {datasource} from "../datasource";
import {User} from "../entities/User.entity";
import {Password} from "../entities/Password.entity";


export const getAllUserByEmail = async (email: string) => {
	return await datasource.getRepository(User).find({
		where: { email },
		relations:{
			passwords:true
		}
	})
}

export const signupNewUser = async ({email, password, name}:{email:string, password:string, name:string})=>{
	const newUser = new User(name,email)
	const newPassword = new Password(password)
	newUser.addPassword(newPassword)

	await datasource.getRepository(User).save(newUser)
	await datasource.getRepository(Password).save(newPassword)
}