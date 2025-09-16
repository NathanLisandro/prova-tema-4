import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Periferico } from './perifericos.entity';


@Injectable()
export class PerifericoService {
    constructor(
        @InjectRepository(Periferico)
        private readonly perifericosRepository: Repository<Periferico>
    ) {
  }

  create(periferico: Periferico){
    const perifericoCreated =  this.perifericosRepository.create(periferico);

    return this.perifericosRepository.save(perifericoCreated);
  }

  findAll(){
    return this.perifericosRepository.find();
  }

  update(id: string, periferico: Periferico){
    return this.perifericosRepository.update(id, periferico);
  }

  remove(id: string){
    return this.perifericosRepository.delete(id)
  }

  findOne(id: string){
    return this.perifericosRepository.findOneBy({id: id})
  }

}
