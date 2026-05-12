import {UserEntity} from "../entities/User.entity";
import {datasource} from "../datasource";
import {RoleEntity} from "../entities/Role.entity";

export const getAllRolesAndPermissionByUser = async(user:UserEntity)=>{
	return await datasource.getRepository(RoleEntity).find({
		where:{
			users:user,
		},relations:{
			permissions:true
		}
	})
}