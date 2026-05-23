import { MigrationInterface, QueryRunner } from "typeorm";

export class Category1779518339391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists category
            (
                id         varchar(45)                           not null
                    primary key,
                slug       varchar(45)                           not null,
                title      varchar(45)                           not null,
                created_at timestamp default CURRENT_TIMESTAMP() not null
            )
                comment 'table to have data of all blogging category';
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            drop table if exists category
                `)
    }

}
