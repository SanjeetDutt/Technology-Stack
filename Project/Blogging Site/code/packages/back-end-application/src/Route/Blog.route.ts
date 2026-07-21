import {POST, Controller} from "common-back-end"

const blogController = Controller("/blog")

const createBlogCategory  =
    POST("/category",async ()=>{ return{}})
    .controller(blogController)
    .export()

const createTag =
    POST("/tag", async ()=> ({}))
        .controller(blogController)
        .export()