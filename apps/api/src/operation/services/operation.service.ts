import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { getPaginationQueryData } from '../../common/pagination-query.dto';

@Injectable()
export class OperationService{
  constructor(
    private readonly prismaService:PrismaService,
  ){}

  async create(data:CreateOperationDto){
    const operation = await this.prismaService.operation.create({
      data
    });

    return new OperationEntity(operation);
  }

  async findAll({...query}:FindAllOperationsDto){
    const where:Prisma.OperationWhereInput ={
      //Here you will put the values that are in the FindAllDto
    }

    const totalCount = await this.prismaService.undefined.count({where})

    const undefineds = await this.prismaService.undefined.findMany({
      ...getPaginationQueryData(query),
      orderBy:query.sort,
      where,
    });

    const entities = undefineds.map((undefined)=> new OperationEntity(undefined),);

    return{
      totalCount,
      entities,
    };
  }

  async findOne(id:string){
    const undefined = await this.prismaService.undefined.findUnique({
      where:{ id },
    });

    if(!undefined){
      throw new NotFoundException(`Operation with id ${id} not found`);
    }

    return new OperationEntity(undefined);
  }

  async update(id:string, data:UpdateOperationDto){
    const updatedOperation = await this.prismaService.undefined.update({
      where:{ id },
      data,
    });

    return new OperationEntity(updatedOperation);
  }

  remove(id:string){
    return this.prismaService.undefined.delete({where: { id }});
  }
}