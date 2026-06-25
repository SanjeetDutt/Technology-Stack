"use client"

import {Card} from "@component";
import {useEffect} from "react";
import {BlogListProvider} from "@store";
import {API} from "@/library/backend"

export default function(){
    return (
        <BlogListProvider>
            <div className="d-flex column-flex gap-lg">
                <h1>Blogs</h1>
                <CardsContainer/>
            </div>
        </BlogListProvider>
    )
}

const CardsContainer = ()=> {

    useEffect(() => {
        API.blog.getAllBlogs().then(response=>{
            console.log(response)
        })
    }, [])

    return (
        <div className="d-flex row-flex gap-md">
            <Card>
                This is a card
            </Card>

            <Card>
                This is a card
            </Card>

            <Card>
                This is a card
            </Card>

            <Card>
                This is a card
            </Card>
        </div>
    )
}