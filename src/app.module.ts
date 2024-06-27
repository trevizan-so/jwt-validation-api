import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ValidationController } from './validation/validation.controller';

import { JwtService } from './jwt/jwt.service';
import { ValidationService } from './validation/validation.service';
import { CacheService } from './cache/cache.service';
import { TrackingService } from './tracking/tracking.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register()],
  controllers: [ValidationController],
  providers: [ ValidationService, JwtService, CacheService, TrackingService],
})
export class AppModule {}
