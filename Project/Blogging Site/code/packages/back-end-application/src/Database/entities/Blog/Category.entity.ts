import {_BaseEntity} from "../_Base.entity";
import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {BlogEntity} from "./Blog.entity";

@Entity("category")
export class CategoryEntity extends _BaseEntity{

    @PrimaryGeneratedColumn("uuid",{name:"id"})
    id?: string

    @Column("varchar",{name:"slug",length:45})
    slug: string

    @Column("varchar",{name:"title",length:45})
    title: string

    @OneToMany(()=>BlogEntity, blog=>blog.category)
    blogs?: BlogEntity[]

    constructor(title: string, slug: string) {
        super();
        this.title = title
        this.slug = slug
    }
}