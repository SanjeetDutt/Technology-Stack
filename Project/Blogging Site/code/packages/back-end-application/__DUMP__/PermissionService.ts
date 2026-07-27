import {Permissions} from "../src/Controlers";
import {PermissionEntity,getAllPermissions, insertPermission, updatePermission} from "../src/Database";

interface IPermissionService {
	syncDB:()=>Promise<void>;
}

export const permissionService:IPermissionService = {
	syncDB:async ()=> {
		const permissionInDb = await getAllPermissions();
		const permissionInDbMap:{[key:string]:PermissionEntity} = {}

		permissionInDb.forEach(permission=>{
			permissionInDbMap[permission.name] = permission;
		});

		for(const [key, value] of Object.entries(Permissions)){
			if(key in permissionInDbMap){
				// permission is already in DB, update the description if needed
				console.log(`Permission ${key} already exists`)
				const permissionToUpdate = permissionInDbMap[key];
				permissionToUpdate!.description = value
				await updatePermission(permissionToUpdate!)
			} else {
				// permission is not in DB, create a new record
				console.log(`Inserted new permission ${key}.`)
				const permissionToInsert = new PermissionEntity(key, value)
				await insertPermission(permissionToInsert)
			}
		}



	}
}