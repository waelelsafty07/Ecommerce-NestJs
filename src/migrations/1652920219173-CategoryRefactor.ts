import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryRefactor1652920219173 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE categories ALTER COLUMN description SET NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE categories ALTER COLUMN description SET  NULL`,
    );
  }
}
// npm run build
// npx typeorm migration:run
