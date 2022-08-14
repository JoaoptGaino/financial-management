import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { getPaginationQueryData } from '../../common/pagination-query.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { FindAllCategorysDto } from '../dto/find-all-categorys.dto';
import { Prisma } from '@prisma/client';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const category = await this.prismaService.category.create({
      data,
    });

    return new CategoryEntity(category);
  }

  async findAll({ name, ...query }: FindAllCategorysDto) {
    const where: Prisma.CategoryWhereInput = {
      name: { contains: name, mode: 'insensitive' },
    };

    const totalCount = await this.prismaService.category.count({ where });

    const categorys = await this.prismaService.category.findMany({
      ...getPaginationQueryData(query),
      orderBy: query.sort,
      where,
    });

    const entities = categorys.map((category) => new CategoryEntity(category));

    return {
      totalCount,
      entities,
    };
  }

  async findOne(id: string) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return new CategoryEntity(category);
  }

  async update(id: string, data: UpdateCategoryDto) {
    const updatedCategory = await this.prismaService.category.update({
      where: { id },
      data,
    });

    return new CategoryEntity(updatedCategory);
  }

  remove(id: string) {
    return this.prismaService.category.delete({ where: { id } });
  }
}
