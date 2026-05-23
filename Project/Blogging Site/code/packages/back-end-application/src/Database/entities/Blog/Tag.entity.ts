import {_BaseEntity} from "../_Base.entity";
import {Column, Entity, PrimaryGeneratedColumn, ManyToMany} from "typeorm";
import {BlogEntity} from "./Blog.entity";

@Entity("tag")
export class TagEntity extends _BaseEntity{
    @PrimaryGeneratedColumn("uuid",{name:"id"})
    id?: string

    @Column("slug")
    slug: string

    @Column("title")
    title: string

    @ManyToMany(()=>BlogEntity, blog=>blog.tags)
    blogs: BlogEntity[]

    constructor(title: string, slug: string) {
        super();
        this.title = title
        this.slug = slug
        this.blogs = []
    }
}