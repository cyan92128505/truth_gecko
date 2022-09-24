import {MigrationInterface, QueryRunner} from 'typeorm';

export class InitialMigration1664008363644 implements MigrationInterface {
  name = 'InitialMigration1664008363644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "credentials" ("provider" character varying NOT NULL, "subject" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "user_id" uuid, CONSTRAINT "UQ_094a81a46e05b8b6ecd68541a70" UNIQUE ("provider", "subject"), CONSTRAINT "PK_094a81a46e05b8b6ecd68541a70" PRIMARY KEY ("provider", "subject"))'
    );
    await queryRunner.query(
      'CREATE TABLE "historys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "message" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL, "user_id" uuid, CONSTRAINT "PK_f92309ade01ad5ae8c7b4739871" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP NOT NULL, "is_verified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "tokens" ("type" character varying NOT NULL, "token" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "user_id" uuid, CONSTRAINT "UQ_cd401677a2027dadbfc8a5b36d8" UNIQUE ("type", "token"), CONSTRAINT "PK_cd401677a2027dadbfc8a5b36d8" PRIMARY KEY ("type", "token"))'
    );
    await queryRunner.query(
      'ALTER TABLE "credentials" ADD CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "historys" ADD CONSTRAINT "FK_c59beeb0df15aa8465c2cdeb4c6" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"'
    );
    await queryRunner.query(
      'ALTER TABLE "historys" DROP CONSTRAINT "FK_c59beeb0df15aa8465c2cdeb4c6"'
    );
    await queryRunner.query(
      'ALTER TABLE "credentials" DROP CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0"'
    );
    await queryRunner.query('DROP TABLE "tokens"');
    await queryRunner.query('DROP TABLE "Users"');
    await queryRunner.query('DROP TABLE "historys"');
    await queryRunner.query('DROP TABLE "credentials"');
  }
}
