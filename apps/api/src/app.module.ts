import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { OperationModule } from './operation/operation.module';

@Module({
  imports: [CategoryModule, OperationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
