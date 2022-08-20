import { OperationType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export const operationTypeEnum = Object.values(OperationType).join(',');

export class CreateOperationDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: '"name" must be a string ' })
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: '"description" must be a string ' })
  description: string;

  @IsNotEmpty({ message: 'Value is required' })
  @IsNumber({}, { message: '"value" must be a number ' })
  value: number;

  @IsNotEmpty({ message: 'Category is required' })
  @IsUUID('4', { message: '"categoryId" must be an UUID v4' })
  categoryId: string;

  @IsNotEmpty({ message: 'Operation Type is required' })
  @IsArray()
  operationType: OperationType[];

  @IsOptional()
  @IsDate({ message: '"payday" must be a date' })
  @Type(() => Date)
  payday?: Date;

  @IsOptional()
  @IsDate({ message: '"dueDate" must be a date' })
  @Type(() => Date)
  dueDate?: Date;
}
