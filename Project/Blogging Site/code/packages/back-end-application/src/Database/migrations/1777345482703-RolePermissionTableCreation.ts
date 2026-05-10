import { MigrationInterface, QueryRunner } from "typeorm";

export class RolePermissionTableCreation1777345482703 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists role_permission
            (
                role_id         varchar(45) not null,
                permission_name varchar(45) not null,
                created_at      timestamp   not null default now(),
                primary key (role_id, permission_name),
                foreign key (role_id) references role (id),
                foreign key (permission_name) references permission (name)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table if exists role_permission;`)
    }

}
