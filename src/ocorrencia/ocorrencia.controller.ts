import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { OcorrenciaService } from './ocorrencia.service';

@Controller('ocorrencia')
export class OcorrenciaController {
    constructor(private readonly service: OcorrenciaService) { }

    @Get() 
    async findAll() {
        return await this.service.findAll();
    } 
    
    @Get(":id")
    async findById(@Param() id: number) {
        return this.service.findById(id)
    }
}
