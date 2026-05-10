import dotenv from 'dotenv';
import "reflect-metadata"
import {datasource} from "./Database";
import {app} from "./app"
dotenv.config();
const PORT = process.env.BACKEND_SERVER_PORT || 3001;
datasource.initialize()
	.then(()=>{
		console.log("DATASOURCE has been initialized");
		app.listen(PORT, () => {
			console.log(`Server is running at http://localhost:${PORT}`);
		});
	})
	.catch((error: Error) => {
		console.error("Got error while initializing datasource",error);
	})

