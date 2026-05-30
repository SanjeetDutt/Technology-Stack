import fs from "fs/promises"
export const createFile = async (file: `/${string}`, content="")=>{
	await fs.writeFile(`./src/Uploads${file}`, content, {
		flag:"wx"
	})
}