import { Module } from '@nestjs/common';
import { PerifericoController } from './perifericos.controller';
import { PerifericoService } from './perifericos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periferico } from './perifericos.entity';

@Module({
  controllers: [PerifericoController],
  providers: [PerifericoService],
  imports: [TypeOrmModule.forFeature([Periferico])],
  
})
export class PerifericoModule {}
