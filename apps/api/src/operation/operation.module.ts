import { Module } from '@nestjs/common';
import { OperationService } from './services/operation.service';
import { OperationController } from './controllers/operation.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OperationController],
  providers: [OperationService],
  exports: [OperationService],
})
export class OperationModule {}