import { MigrationInterface, QueryRunner } from "typeorm";

export class Blog1779518231619 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                            create table if not exists blog
                            (
                                id           varchar(45)  not null primary key,
                                user_id      varchar(45)  not null,
                                slug         varchar(500) not null,
                                title        varchar(500) not null,
                                description  text         not null,
                                file         varchar(50)  not null,
                                category_id  varchar(45)  not null,
                                publish_date datetime     null,
                                created_at   timestamp default CURRENT_TIMESTAMP() not null,
                                constraint blog_user_id_fk
                                    foreign key (user_id) references user (id)
                            );


                        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            drop table if exists blog;
        `)
    }

}
