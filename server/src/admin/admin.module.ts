import { Module } from '@nestjs/common';

import { GiftsModule } from '../gifts/gifts.module';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [GiftsModule, AuthModule],
  controllers: [AdminController],
})
export class AdminModule {}
