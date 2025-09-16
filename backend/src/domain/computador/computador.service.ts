import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Computador } from './computador.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ComputadorService {
	constructor(
		@InjectRepository(Computador)
		private readonly computadorRepository: Repository<Computador>
	) {
  }

  async create(computador: Computador){
    const newComputador = this.computadorRepository.create(computador);
    return await this.computadorRepository.save(newComputador);
  }

  async findAll(){
    return await this.computadorRepository.find({ relations: ['perifericos'] });
  }

  async update(id: string, computador: Computador){
    const existingComputador = await this.findOne(id);
    if (!existingComputador) {
        return new  NotFoundException("O computador com esse id não foi encontrado");
    }

    const { perifericos, ...computadorData } = computador;
    
    Object.assign(existingComputador, computadorData);
    
    if (perifericos && perifericos.length > 0) {
      existingComputador.perifericos = perifericos;
    }
    
    return await this.computadorRepository.save(existingComputador);
  }

  async remove(id: string){
    const computador = await this.findOne(id);
    if (!computador){
      return new  NotFoundException("O computador com esse id não foi encontrado");
    }
    
    return await this.computadorRepository.remove(computador);
  }

  async findOne(id: string){
    return await this.computadorRepository.findOne({ where: { id }, relations: ['perifericos'] });
  }

}
