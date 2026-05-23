import { MigrationInterface, QueryRunner } from "typeorm";

export class BlogTag1779518368531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                    create table if not exists blog_tag
                    (
                        blog_id varchar(45) not null,
                        tag_id  varchar(45) not null,
                        created_at   timestamp default CURRENT_TIMESTAMP() not null,
                        constraint blog_tag_pk
                            primary key (tag_id, blog_id),
                        constraint blog_tag_blog_id_fk
                            foreign key (blog_id) references blog (id),
                        constraint blog_tag_tag_id_fk
                            foreign key (tag_id) references tag (id)
                    );
                `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                    drop table if exists blog_tag;
                `)
    }

}
