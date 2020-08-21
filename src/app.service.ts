import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { cliente } from './cliente/cliente.entity';
import { ocorrencia } from './ocorrencia/ocorrencia.entity';
import { produto } from './produto/produto.entity';
import { OcorrenciaService } from './ocorrencia/ocorrencia.service';
import { ClienteService } from './cliente/cliente.service';
import { ProdutoService } from './produto/produto.service';
const nodemailer = require('nodemailer');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
  private ocorrencia: ocorrencia;
  private cliente = new cliente();
  private isEnviado: boolean;
  private listaProdutos: Array<produto> = [];
  private mensagemCliente: string;
  private ocorrenciaDescricao: string;

  constructor(
    private readonly ocorrenciaService : OcorrenciaService,
    private readonly clienteService : ClienteService,
    private readonly produtoService : ProdutoService
  ){}


  @Cron(CronExpression.EVERY_30_SECONDS)
  async sendMail() {
    this.buscaCliente();
  }
  
  //busca cliente e chama o busca produto
  async buscaCliente(){
    this.clienteService.findAll().then(value =>{

      for(var i = 0; i < value.length; i++){
        this.cliente.nome = value[i].nome;
        this.cliente.email = value[i].email;
        this.buscarProdutos(this.cliente.nome, this.cliente.email);
      }
    }, 
    function(value) {
    });

  }

  // busca produto e envia o e-mail
  async buscarProdutos(nome: string, email: string){
    this.produtoService.findAll().then(value => {
      this.listaProdutos = value;    
      this.enviarEmail(email, this.listaProdutos, nome);
    }, 
    function(value) {
    });
  }

  //enviar e-mail com os produtos
  async enviarEmail(email: string, produto: Array<produto>, nome:string){
    this.mensagemCliente = '';

    for(var i = 0; i < produto.length; i++){
      const produtoNome     = produto[i].nome;
      const produtoDescricao = produto[i].descricao;
      const produtoPreco     = produto[i].preco;
      const produtoPrecoPromocao    = produto[i].precoPromocao;

      this.mensagemCliente += produtoNome +" "+ produtoDescricao +
                              "<br>De R$:"+ produtoPreco +
                              "<br>Por R$:"+produtoPrecoPromocao;
    }
   
    let transporter = nodemailer.createTransport({
      host:  "localhost",
      port: "1025",
      auth: null,
    });

    transporter.sendMail({
      from: 'alisson.chagas@edu.unipar.br',
      to: email,
      subject: "Limpa Estoque", 
      html: "Olá " + nome + " Entramos na semana *Limpa Estoque* com ofertas Imbatíveis para essa semanas vai ficar de fora!!!<br><br>"+
            "<p>"+this.mensagemCliente+"</p>",
    }).then(info =>{
      this.isEnviado = true;
      this.ocorrenciaDescricao = 'Email emviado com sucesso para [ '+ email +' ]';
      this.salvaRegistro(true, this.ocorrenciaDescricao);
    },
      function(info){}
    );    

    this.isEnviado = false;
    this.ocorrenciaDescricao = 'Erro ao enviar email para [ '+ email +' ]';
    this.salvaRegistro(this.isEnviado, this.ocorrenciaDescricao);
    
  }

  // registra logs
  async salvaRegistro(IsEnviado:boolean, ocorrenciaDescricao: string){
    
    var data = new Date();
    this.ocorrencia = new ocorrencia();

    this.ocorrencia.IsEnviado = IsEnviado;
    this.ocorrencia.descricao = ocorrenciaDescricao;
    this.ocorrencia.dataEvento = data;

    this.ocorrenciaService.save(this.ocorrencia);
  }
  
}
