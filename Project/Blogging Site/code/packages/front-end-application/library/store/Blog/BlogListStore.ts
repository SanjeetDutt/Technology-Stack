import {createGlobalStore} from "@/library/store/utility";
import {API_Response} from "@/library/store/type";
import {DTO} from "@/library/backend"

interface BlogListState {
    blogs: API_Response<DTO.Blog.Blog.Response> | null
}

interface BlogListAction{
}

const store = createGlobalStore<BlogListState, BlogListAction>((set)=>({
    blogs:null,

}))

export const BlogListProvider = store.Provider
export const useBlogList = store.useStore