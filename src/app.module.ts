import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { produto } from './produto/produto.entity';
import { cliente } from './cliente/cliente.entity';
import { ClienteController } from './cliente/cliente.controller';
import { ProdutoController } from './produto/produto.controller';
import { ClienteService } from './cliente/cliente.service';
import { ProdutoService } from './produto/produto.service';
import { OcorrenciaController } from './ocorrencia/ocorrencia.controller';
import { OcorrenciaService } from './ocorrencia/ocorrencia.service';
import { ocorrencia } from './ocorrencia/ocorrencia.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'enviaEmail',
      entities: [
        cliente, produto, ocorrencia
      ],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([ cliente, produto, ocorrencia])
  ],
  controllers: [AppController, ClienteController, ProdutoController, OcorrenciaController],
  providers: [AppService, ClienteService, ProdutoService, OcorrenciaService],
})
export class AppModule { }
