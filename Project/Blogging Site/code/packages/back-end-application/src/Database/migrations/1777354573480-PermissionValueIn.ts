import { MigrationInterface, QueryRunner } from "typeorm";

export class PermissionValueIn1777354573480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                    insert into permission (name, description)
                    values ('ADMIN', 'All admin rights'),
                           ('USER_MGMT', 'All user management rights'),
                           ('AUTHOR', 'Authoring the blog post rights'),
                           ('REVIEWER', 'For reviewing the blog post');
                `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`delete from permission where name in ('ADMIN','USER_MGMT','AUTHOR','REVIEWER')`)
    }

}
