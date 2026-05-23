import { MigrationInterface, QueryRunner } from "typeorm";

export class Tag1779518351264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists tag
            (
                id    varchar(45) not null primary key,
                slug  varchar(50) not null,
                title varchar(50) not null,
                created_at   timestamp default CURRENT_TIMESTAMP() not null
            );
                `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            drop table if exists tag
                `)
    }

}
