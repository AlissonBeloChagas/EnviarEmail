import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly service: ClienteService) { }

    @Get() 
    async findAll() {
        return await this.service.findAll();
    } 
    
    @Get(":id")
    async findById(@Param() id: number) {
        return this.service.findById(id)
    }

    @Post()
    async create(@Body() produto) {
        return await this.service.create(produto)
    }

    @Delete(":id")
    async delete(@Param() id: number) {
        return this.delete(id);
    }
}
