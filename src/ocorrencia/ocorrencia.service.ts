import { Injectable } from '@nestjs/common';
import { ocorrencia } from './ocorrencia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OcorrenciaService {
    constructor(
        @InjectRepository(ocorrencia)
        private ocorrenciaRepository: Repository<ocorrencia>,
    ) { }

    async save(ocorrencia: ocorrencia) {
        this.ocorrenciaRepository.save(ocorrencia);
    }

    async findById(id: number) {
        return this.ocorrenciaRepository.findOne(id);
    }

    async findAll() {
        return this.ocorrenciaRepository.find();
    }
}
