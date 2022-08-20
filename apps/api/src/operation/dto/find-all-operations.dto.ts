import { OperationType, Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '../../common/pagination-query.dto';
import { operationTypeEnum } from './create-operation.dto';

export class FindAllOperationsDto extends PaginationQueryDto<Prisma.CategoryOrderByWithRelationInput> {
  @IsOptional()
  @IsString({ message: '"name" must be a string ' })
  name?: string;

  @IsOptional()
  @IsString({ message: '"description" must be a string ' })
  description?: string;

  @IsOptional()
  @IsString({ message: '"value" must be a string ' })
  value?: number;

  @IsOptional()
  @IsUUID('4', { message: '"categoryId" must be an UUID v4' })
  categoryId?: string;

  @IsOptional()
  @IsEnum(OperationType, {
    message: `"operationType" must be: ${operationTypeEnum}`,
  })
  operationType?: OperationType[];

  @IsOptional()
  @IsDate({ message: '"payday" must be a date' })
  @Type(() => Date)
  payday?: Date;

  @IsOptional()
  @IsDate({ message: '"dueDate" must be a date' })
  @Type(() => Date)
  dueDate?: Date;
}
