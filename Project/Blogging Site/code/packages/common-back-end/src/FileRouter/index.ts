import {DirectoryScan} from "./Core"
import {Router} from "./Router"

declare global{
    var rootDir: string
}

export async function LoadRoutes(dir: string){
    const rootRouter = new Router("/")
    await DirectoryScan(dir, rootRouter)
    console.log(rootRouter.getRoutes())
    return rootRouter
}