import {RoleEntity,UserEntity,getAllRolesAndPermissionByUser} from "../src/Database";
import {Permissions} from "../src/Controlers";

interface IRoleService {
	getRoleAndPermissionByUser:(user:UserEntity)=>Promise<{roles:string[], permissions:Permissions[]}>;
}

export const roleServices: IRoleService = {
	getRoleAndPermissionByUser:async(user:UserEntity)=>{
		const roles:string[] = []
		const permissions:Permissions[] = []
		const permissionList = Object.keys(Permissions)

		const rolesNPermission = await getAllRolesAndPermissionByUser(user);

		for(const {name, permissions:rolePermissions} of rolesNPermission){
			if(!roles.includes(name)){
				roles.push(name);
			}

			if(rolePermissions){
				for(let {name} of rolePermissions){
					if(permissionList.includes(name) && !permissions.includes(name as Permissions)){
						permissions.push(name as Permissions)
					} else {
						console.error(`Permission ${name} is out of scope.`)
					}
				}
			}
		}


		return{
			roles:roles,
			permissions:permissions
		}
	},
}