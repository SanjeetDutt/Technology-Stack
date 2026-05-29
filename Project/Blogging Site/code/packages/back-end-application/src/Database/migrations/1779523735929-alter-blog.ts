import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterBlog1779523735929 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
                            alter table blog
                                add constraint blog_category_id_fk
                                                        foreign key (category_id) references category (id);
                        `)


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                                    alter table if exists blog
                                                    drop foreign key blog_category_id_fk;
                                `)
    }

}
