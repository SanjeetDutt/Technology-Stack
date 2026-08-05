import path from "path"
import fs from "fs"

export const nameStartsAndEndWith = (name: string, startsWith: string, endsWith: string)=>{
    return name.startsWith(startsWith) && name.endsWith(endsWith)
}

export async function importFile(content: fs.Dirent) {
    const { parentPath, name } = content;
    // Resolve standard absolute path (no file:// conversion needed)
    const absolutePath = path.resolve(parentPath, name);
    
    try {
        // A single dynamic import using the absolute path
        const moduleInstance = await import(absolutePath);        
        return moduleInstance as any;
    } catch (error) {
        console.error("IMPORT FAILED:", error);
        throw error;
    }
}
