import { MigrationInterface, QueryRunner } from "typeorm";

export class PermissionTableCreation1777345473863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists permission
            (
                name        varchar(45)  not null primary key,
                description varchar(100) not null default '',
                created_at  timestamp    not null default now()
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table if exists permission;`)
    }

}
