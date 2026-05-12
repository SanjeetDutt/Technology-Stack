import {datasource} from "../datasource";
import {PermissionEntity} from "../entities";

export const getAllPermissions = async () => {
	return await datasource.getRepository(PermissionEntity).find()
}

export const updatePermission = async (permission: PermissionEntity) => {
	return await datasource.getRepository(PermissionEntity).update(permission.name, permission)
}

export const insertPermission = async (permission: PermissionEntity) => {
	return await datasource.getRepository(PermissionEntity).insert(permission)
}