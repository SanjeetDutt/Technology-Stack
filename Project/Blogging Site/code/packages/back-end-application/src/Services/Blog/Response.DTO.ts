import { _Response } from 'common-back-end';
import { BlogEntity } from '@/Database';

export interface BlogResponse extends _Response{
    slug: string,
    title: string,
    description: string,
    user:{
        name: string,
        email: string,
    },
    category:{
        title: string,
        slug: string
    },
    tags:{
        title: string,
        slug: string
    }[]
}

export const BlogEntityMapUtil = (b:BlogEntity):BlogResponse=>({
    slug: b.slug,
    title: b.title,
    description: b.description,
    user:{
        name: b.user.name,
        email: b.user.email,
    },
    category:{
        title: b.category.title,
        slug: b.category.slug
    },
    tags:b.tags ? b.tags.map(t=>({
        title: t.title,
        slug: t.slug
    })) : []
})