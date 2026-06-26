import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Gift System API')
    .setDescription('RESTful API cho hệ thống quà tặng')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Nhập JWT token vào đây (không cần prefix "Bearer ")',
      },
      'access-token',
    )
    .addTag('Auth', 'Đăng nhập user và admin')
    .addTag('Users', 'Hồ sơ cá nhân người dùng')
    .addTag('Gifts', 'Danh sách quà hệ thống (user xem)')
    .addTag('Admin - Gifts', 'Quản lý quà tặng (admin only)')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error(err);
});
