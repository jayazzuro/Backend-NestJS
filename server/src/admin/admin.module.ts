import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AuthModule } from '../auth/auth.module';
import { GiftsModule } from '../gifts/gifts.module';

@Module({
  imports: [GiftsModule, AuthModule],
  controllers: [AdminController],
})
export class AdminModule {}
