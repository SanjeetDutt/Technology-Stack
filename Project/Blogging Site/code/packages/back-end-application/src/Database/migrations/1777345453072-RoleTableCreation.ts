import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleTableCreation1777345453072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists role
            (
                id         varchar(45) not null primary key,
                name       varchar(45) not null,
                created_at timestamp   not null default now()
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table if exists role;`)
    }

}
