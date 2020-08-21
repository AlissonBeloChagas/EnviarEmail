import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cliente } from './cliente.entity';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(cliente)
        private clienteRepository: Repository<cliente>,
    ) { }

    async create(cliente: cliente) {
        return this.clienteRepository.save(cliente);
    }

    async delete(id: number) {
        return this.clienteRepository.delete(id);
    }

    async findById(id: number) {
        return this.clienteRepository.findOne(id);
    }

    async findAll() {
        return this.clienteRepository.find();
    }
}
