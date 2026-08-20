import { Router } from "../FileRouter";
import { ScanDrive } from "../FileRouter/Core";

export async function LoadRouter(dir: string):Promise<Router>{
    const rootRouter = new Router("/")
    await ScanDrive(dir, rootRouter)
    return rootRouter
}