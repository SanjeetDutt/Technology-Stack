import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTableCreation1777345427847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists user
            (
                id         varchar(45) not null primary key,
                name       varchar(45) not null,
                email      varchar(45) not null unique,
                created_at timestamp   not null default now()
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table if exists user;`)
    }

}
