import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1782460439376 implements MigrationInterface {
  name = 'SeedUsers1782460439376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordHash = await bcrypt.hash('password123', 10);

    const adminExists = (await queryRunner.query(
      `SELECT * FROM "users" WHERE "email" = 'admin@example.com'`,
    )) as unknown[];

    if (adminExists.length === 0) {
      await queryRunner.query(
        `INSERT INTO "users" (username, email, password, role) VALUES ('admin', 'admin@example.com', '${passwordHash}', 'ADMIN')`,
      );
    }

    const userExists = (await queryRunner.query(
      `SELECT * FROM "users" WHERE "email" = 'user@example.com'`,
    )) as unknown[];

    if (userExists.length === 0) {
      await queryRunner.query(
        `INSERT INTO "users" (username, email, password, role) VALUES ('user', 'user@example.com', '${passwordHash}', 'USER')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "users" WHERE "email" IN ('admin@example.com', 'user@example.com')`,
    );
  }
}
