import { Module } from '@nestjs/common';
import { AppController } from '../junkyard/app.controller';
import { AppService } from '../junkyard/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
