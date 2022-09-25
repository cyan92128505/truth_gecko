import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnExpiredAtIntoTokens1664101945968 implements MigrationInterface {
    name = 'AddColumnExpiredAtIntoTokens1664101945968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" ADD "expired_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "UQ_cd401677a2027dadbfc8a5b36d8" UNIQUE ("type", "token")`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "UQ_094a81a46e05b8b6ecd68541a70" UNIQUE ("provider", "subject")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "UQ_094a81a46e05b8b6ecd68541a70"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "UQ_cd401677a2027dadbfc8a5b36d8"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "expired_at"`);
    }

}
