import {DataSource} from "typeorm"
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost"
const DB_PORT = process.env.DB_PORT || 3306
const DB_USERNAME = process.env.DB_USERNAME || "root"
const DB_PASSWORD = process.env.DB_PASSWORD || "root"
const DB_SCHEMA = process.env.DB_SCHEMA || "portfolio"

export const datasource = new DataSource({
	type: "mysql",
	host: DB_HOST,
	port: parseInt(String(DB_PORT)),
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_SCHEMA,
	logging:true,
	entities:[__dirname + "/**/*.entity{.ts,.js}"],

	//Setting up migration
	synchronize: false,
	migrations:[__dirname + "/migrations/*.ts"],
	migrationsRun:false,
	migrationsTableName:"migrations",
	migrationsTransactionMode:"all"
})