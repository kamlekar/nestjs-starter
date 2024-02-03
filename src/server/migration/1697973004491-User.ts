import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1697973004491 implements MigrationInterface {
  name = 'User1697973004491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refreshToken" character varying NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }
}
