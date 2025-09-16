import { Injectable } from '@nestjs/common';
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

  create(computador: Computador){
    return this.computadorRepository.create(computador)
  }

  findAll(){
    return this.computadorRepository.find();
  }

  update(id: string, computador: Computador){
    return this.computadorRepository.update(id, computador);
  }

  remove(id: string){
    return this.computadorRepository.delete(id)
  }

  findOne(id: string){
    return this.computadorRepository.findOneBy({id: id})
  }

}
