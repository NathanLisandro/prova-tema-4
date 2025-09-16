import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Periferico } from './perifericos.entity';
import { PerifericoService } from './perifericos.service';

@Controller('periferico')
export class PerifericoController {
  constructor(private readonly perifericoService: PerifericoService ) {}

  @Post()
  create(@Body() periferico: Periferico) {
    return this.perifericoService.create(periferico);
  }

  @Get()
  findAll() {
    return this.perifericoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perifericoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateperiferico: Periferico) {
    return this.perifericoService.update(id, updateperiferico);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perifericoService.remove(id);
  }
}
