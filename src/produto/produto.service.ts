import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { produto } from './produto.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(produto)
        private produtoRepository: Repository<produto>,
    ) { }

    async create(produto: produto) {
        return this.produtoRepository.save(produto);
    }

    async delete(id: number) {
        return this.produtoRepository.delete(id);
    }

    async findById(id: number) {
        return this.produtoRepository.findOne(id);
    }

    async findAll() {
        return this.produtoRepository.find();
    }
}
