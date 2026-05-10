import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoleTableCreation1777345461209 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists user_role
            (
                user_id    varchar(45) not null,
                role_id    varchar(45) not null,
                created_at timestamp   not null default now(),
                primary key (user_id, role_id),
                foreign key (user_id) references user (id),
                foreign key (role_id) references role (id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table if exists user_role;`)
    }

}
