import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedGifts1782460439377 implements MigrationInterface {
  name = 'SeedGifts1782460439377';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const gifts = [
      {
        name: 'Voucher Shopee 100k',
        description: 'Voucher giảm giá 100.000đ trên Shopee cho đơn từ 200k',
        point: 50,
        quantity: 100,
      },
      {
        name: 'Voucher Grab 50k',
        description:
          'Voucher giảm giá 50.000đ cho chuyến xe hoặc đồ ăn trên Grab',
        point: 30,
        quantity: 200,
      },
      {
        name: 'Thẻ cào Viettel 20k',
        description: 'Thẻ nạp điện thoại Viettel mệnh giá 20.000đ',
        point: 10,
        quantity: 500,
      },
      {
        name: 'Voucher Netflix 1 tháng',
        description: 'Tài khoản Netflix gói Basic trong 1 tháng',
        point: 150,
        quantity: 20,
      },
      {
        name: 'Tai nghe Bluetooth',
        description: 'Tai nghe không dây Bluetooth 5.0, pin 20h',
        point: 500,
        quantity: 10,
      },
      {
        name: 'Cốc giữ nhiệt 500ml',
        description: 'Bình giữ nhiệt inox 304, dung tích 500ml, giữ nhiệt 12h',
        point: 200,
        quantity: 50,
      },
    ];

    for (const gift of gifts) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const existing: any[] = await queryRunner.query(
        `SELECT * FROM "gifts" WHERE "name" = $1`,
        [gift.name],
      );

      if (existing.length === 0) {
        await queryRunner.query(
          `INSERT INTO "gifts" (name, description, point, quantity) VALUES ($1, $2, $3, $4)`,
          [gift.name, gift.description, gift.point, gift.quantity],
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "gifts" WHERE "name" IN (
        'Voucher Shopee 100k',
        'Voucher Grab 50k',
        'Thẻ cào Viettel 20k',
        'Voucher Netflix 1 tháng',
        'Tai nghe Bluetooth',
        'Cốc giữ nhiệt 500ml'
      )`,
    );
  }
}
