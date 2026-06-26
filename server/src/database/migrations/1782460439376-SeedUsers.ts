import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedUsers1782460439376 implements MigrationInterface {
  name = 'SeedUsers1782460439376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordHash = await bcrypt.hash('password123', 10);

    // Check if admin@example.com exists
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const adminExists: any[] = await queryRunner.query(
      `SELECT * FROM "users" WHERE "email" = 'admin@example.com'`,
    );
    if (adminExists.length === 0) {
      await queryRunner.query(
        `INSERT INTO "users" (username, email, password, role) VALUES ('admin', 'admin@example.com', '${passwordHash}', 'ADMIN')`,
      );
    }

    // Check if user@example.com exists
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userExists: any[] = await queryRunner.query(
      `SELECT * FROM "users" WHERE "email" = 'user@example.com'`,
    );
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
