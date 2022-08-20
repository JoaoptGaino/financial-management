import { Category, Operation, OperationType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Transform } from 'class-transformer';

export class OperationEntity {
  id: string;
  name: string;
  description: string;

  @Transform(({ value }: { value: Decimal }) => value.toNumber())
  value: Decimal;

  payday: Date;
  dueDate: Date;
  operationType: OperationType[];
  categoryId: string;
  Category: Category;
  createdAt: Date;
  updatedAt: Date;

  constructor(operation: Operation & { Category?: Category }) {
    this.id = operation.id;
    this.name = operation.name;
    this.description = operation.description;
    this.value = operation.value;
    this.payday = operation.payday;
    this.dueDate = operation.dueDate;
    this.operationType = operation.operationType;
    this.categoryId = operation.categoryId;
    this.Category = operation.Category;
    this.createdAt = operation.createdAt;
    this.updatedAt = operation.updatedAt;
  }
}
