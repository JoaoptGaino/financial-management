import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OperationService } from '../services/operation.service';
import { CreateOperationDto } from '../dto/create-operation.dto';
import { UpdateOperationDto } from '../dto/update-operation.dto';
import { FindAllOperationDto } from '../dto/find-all-operation.dto';

@Controller('operation')
export class OperationController{
  constructor(private readonly undefinedService: OperationService){}


  @Post()
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.undefinedsService.create(createOperationDto);
  }

  @Get()
  findAll(@Query() query: FindAllOperationsDto) {
    return this.undefinedsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.undefinedsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.undefinedsService.update(id, updateOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.undefinedsService.remove(id);
  }
}