import {Permissions, Router} from "../Middlewares";
import {blogService, categoryService, tagService} from "../../Services";
import {Controller, GET, Router as CBE_Router} from "common-back-end"

export const blogRouter = Router("/blog")

const defaultBlogPermission = [Permissions.AUTHOR, Permissions.REVIEWER]

// Get list of all categories
blogRouter.get("/category",[], categoryService.getCategories)
// Create a new category
blogRouter.post("/category", defaultBlogPermission, categoryService.addCategory)
// Update category details
blogRouter.put("/category/:slug",defaultBlogPermission, categoryService.updateCategory)

// Get list of all tags
blogRouter.get("/tag",[], tagService.getTags)
// Create new tag
blogRouter.post("/tag",defaultBlogPermission, tagService.addTag)
// Update tag details
blogRouter.put("/tag/:slug",defaultBlogPermission, tagService.updateTag)

// Get list of all blogs without content
blogRouter.get("/",[], blogService.getAllBlogs)
// Get complete blog details with content
blogRouter.get("/:slug",[], blogService.getBlog)
// Update blog content and details
blogRouter.put("/:slug", defaultBlogPermission, blogService.updateBlog)
//create new blog
blogRouter.post("/", defaultBlogPermission, blogService.createBlog)