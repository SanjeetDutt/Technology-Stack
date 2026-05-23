import {_BaseEntity} from "../_Base.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn,JoinTable, JoinColumn, ManyToMany} from "typeorm";
import {UserEntity} from "../User";
import {CategoryEntity} from "./Category.entity";
import {TagEntity} from "./Tag.entity";

@Entity("blog")
export class BlogEntity extends _BaseEntity{

    @PrimaryGeneratedColumn("uuid",{name:"id"})
    id?: string

    @Column("varchar",{nullable: false, name:"slug"})
    slug: string

    @Column("varchar",{nullable: false, name:"title"})
    title: string

    @Column("varchar",{nullable: false, name:"description"})
    description: string

    @Column("varchar",{nullable: true, name:"file"})
    file?: string

    @ManyToOne(()=>UserEntity)
    @JoinColumn({name: "user_id"})
    user: UserEntity

    @ManyToOne(()=>CategoryEntity)
    @JoinColumn({name: "category_id"})
    category: CategoryEntity

    @ManyToMany(()=>TagEntity, tag=>tag.blogs)
    @JoinTable({
        name: "blog_tag",
        joinColumn:{name: "blog_id", referencedColumnName:"id"},
        inverseJoinColumn:{name: "tag_id", referencedColumnName:"id"}
    })
    tags?: TagEntity[]

    constructor(title: string, slug: string, description: string, user: UserEntity, category: CategoryEntity) {
        super();
        this.title = title
        this.slug = slug
        this.description = description
        this.user = user
        this.category = category
        this.tags = []
    }
}