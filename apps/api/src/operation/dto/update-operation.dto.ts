import { OperationType } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateOperationDto {
  @Exclude()
  id?: string;

  @IsOptional()
  @IsString({ message: '"name" must be a string ' })
  name?: string;

  @IsOptional()
  @IsString({ message: '"description" must be a string ' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: '"value" must be a number' })
  value?: number;

  @IsOptional()
  @IsUUID('4', { message: '"categoryId" must be an UUID v4' })
  categoryId?: string;

  @IsOptional()
  @IsArray()
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
