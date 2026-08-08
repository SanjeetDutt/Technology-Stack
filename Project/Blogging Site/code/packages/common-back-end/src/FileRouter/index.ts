import {DirectoryScan} from "./Core"
import {Router} from "./Router"

export async function LoadRoutes(dir: string){
    const rootRouter = new Router("/")
    await DirectoryScan(dir, rootRouter)
    return rootRouter
}

export * from "./Define"