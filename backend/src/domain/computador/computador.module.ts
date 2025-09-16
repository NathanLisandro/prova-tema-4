import { Module } from '@nestjs/common';
import { ComputadorController } from './computador.controller';
import { ComputadorService } from './computador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Computador } from './computador.entity';

@Module({
  controllers: [ComputadorController],
  providers: [ComputadorService],
  imports: [TypeOrmModule.forFeature([Computador])],

})
export class ComputadorModule {}
