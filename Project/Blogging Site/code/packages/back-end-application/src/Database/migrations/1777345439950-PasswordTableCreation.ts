import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordTableCreation1777345439950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists password
            (
                user_id    varchar(45)  not null,
                password   varchar(100) not null,
                created_at timestamp    not null default now(),
                primary key (user_id, password),
                foreign key (user_id) references user (id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table if exists password;`)
    }

}
