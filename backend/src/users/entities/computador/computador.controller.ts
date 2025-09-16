import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComputadorService } from './computador.service';
import { Computador } from './computador.entity';

@Controller('computador')
export class ComputadorController {
  constructor(private readonly computadorService: ComputadorService) {}

  @Post()
  create(@Body() computador: Computador) {
    return this.computadorService.create(computador);
  }

  @Get()
  findAll() {
    return this.computadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.computadorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComputador: Computador) {
    return this.computadorService.update(id, updateComputador);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.computadorService.remove(id);
  }
}
