import dotenv from 'dotenv';
import "reflect-metadata"
import {datasource} from "./Database";
import {REST_APPLICATION} from "common-back-end"
dotenv.config();
const PORT = process.env.BACKEND_SERVER_PORT || 3001;
import {permissionService} from "./Services"

datasource.initialize()
	.then(async ()=>{
		console.log("DATASOURCE has been initialized. Starting synchronizing permissions...");
		await permissionService.syncDB()
		console.log("Permission sync completed. Starting server...")
		// BE_Collection.app()
		REST_APPLICATION().listen(PORT, () => {
			console.log(`Server is running at http://localhost:${PORT}`);
		});
	})
	.catch((error: Error) => {
		console.error("Got error while initializing datasource",error);
	})

