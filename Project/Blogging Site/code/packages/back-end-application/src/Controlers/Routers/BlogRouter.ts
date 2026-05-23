import {Permissions, Router} from "../Middlewares";
import {blogService} from "../../Services";

export const blogRouter = Router("/blog")

const defaultBlogPermission = [Permissions.AUTHOR, Permissions.REVIEWER]


blogRouter.post("/create-category",defaultBlogPermission, blogService.createCategory)
blogRouter.post("/create-tag", defaultBlogPermission, blogService.createCategory)