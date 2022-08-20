import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { getPaginationQueryData } from '../../common/pagination-query.dto';
import { CreateOperationDto } from '../dto/create-operation.dto';
import { OperationEntity } from '../entities/operation.entity';
import { FindAllOperationsDto } from '../dto/find-all-operations.dto';
import { OperationType, Prisma } from '@prisma/client';
import { UpdateOperationDto } from '../dto/update-operation.dto';

@Injectable()
export class OperationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateOperationDto) {
    const operation = await this.prismaService.operation.create({
      data,
    });

    return new OperationEntity(operation);
  }

  async findAll({
    categoryId,
    description,
    dueDate,
    name,
    operationType,
    payday,
    value,
    ...query
  }: FindAllOperationsDto) {
    const where: Prisma.OperationWhereInput = {
      name: { contains: name, mode: 'insensitive' },
      description: { contains: description, mode: 'insensitive' },
      payday: payday && new Date(payday),
      dueDate: dueDate && new Date(dueDate),
      operationType: operationType && {
        hasSome: operationType,
      },
      value: value && Number(value),
      categoryId,
    };

    const totalCount = await this.prismaService.operation.count({ where });

    const operations = await this.prismaService.operation.findMany({
      ...getPaginationQueryData(query),
      orderBy: query.sort,
      where,
    });

    const entities = operations.map(
      (operation) => new OperationEntity(operation),
    );

    return {
      totalCount,
      entities,
    };
  }

  async findOne(id: string) {
    const operation = await this.prismaService.operation.findUnique({
      where: { id },
    });

    if (!operation) {
      throw new NotFoundException(`Operation with id ${id} not found`);
    }

    return new OperationEntity(operation);
  }

  async update(id: string, data: UpdateOperationDto) {
    const updatedOperation = await this.prismaService.operation.update({
      where: { id },
      data,
    });

    return new OperationEntity(updatedOperation);
  }

  remove(id: string) {
    return this.prismaService.operation.delete({ where: { id } });
  }
}
