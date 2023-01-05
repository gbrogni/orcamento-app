import { MatSelectModule } from '@angular/material/select';
import { HeaderService } from './../template/header/header.service';
import {  Component, Inject, OnInit } from '@angular/core';
import { OrcamentoService } from './orcamento.service';
import AnoConsult, { Orcamento } from './orcamento.model';
import { ActivatedRoute } from '@angular/router';

export interface ano{
  anoValue: string;
  anoViewValue: string;
}

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss'],
  providers: [OrcamentoService]
})
export class OrcamentoComponent implements OnInit {
  orcamentos: Orcamento[] = [{
    codEmpresa:0,
    tipo:'string',
    data:new Date(),
    codProduto: 0,
    nomeProduto:'string',
    qtde:0,
    custoUni: 0,
    valorVenda:0,
    custoTotal:0,
   }]

  displayedColumns: string[] = ['codProduto', 'nomeProduto', 'custoUni', 'valorVenda', 'custoTotal'];
  dataSource: Orcamento[] = [];

  Anos: ano[] = [
    {anoValue: '2019', anoViewValue: '2019'},
    {anoValue: '2020', anoViewValue: '2020'},
  ]

  constructor(
    public orcamentoService: OrcamentoService, 
    private headerService: HeaderService,
    @Inject(MatSelectModule)public data: AnoConsult,
    @Inject(MatSelectModule)public mes: Orcamento,
    public route: ActivatedRoute
    ) 
    { 
    headerService.headerData = {
      title: 'Orçamento',
      icon: 'home',
      routeUrl:''
    }
  }


   
 
  hidden!: boolean;
  hiddenn!: boolean;


  ngOnInit(): void {
    this.hidden = false;
    console.log(this.meses);
  }

  ocultaVenda(){
    this.hidden = !this.hidden;
}

  ocultaCusto(){
  this.hiddenn = !this.hiddenn;
}

  consultar(){
    this.orcamentoService.getProdutos(this.data.AnoConsult).subscribe(orcamentosdados=>{
      this.orcamentos = orcamentosdados;
    })
  }

  calcular(){
    this.orcamentoService.getByYear(this.data.AnoConsult).subscribe(orcamentosdados=>{
      let orcamentomap = this.agrupaProd(orcamentosdados);
      for (const [codProduto, produtos] of orcamentomap){
        const mesMap = this.agrupaProdMes(produtos)
        console.log(mesMap)
        const [prod] = produtos;
        for (const [mes, prodMeses] of mesMap){
          const custoTotal = prod.custoUni * prodMeses.lenght
          // const valortotal = 
        }
      }
      this.orcamentos=orcamentosdados;
    })
  }

  agrupaProd(produtos: any[]){
    const mapProdutos = new Map()
    for (const produto of produtos){
      const mapValores = mapProdutos.get(produto.codProduto) || []
      mapValores.push(produto)
      mapProdutos.set(produto.codProduto, mapValores)
    }
    return mapProdutos; 
  }

  agrupaProdMes(produtos: any[]){
    const mapMeses = new Map()
    for (const produto of produtos){
      const mes = new Date(produto.mes).getMonth()
      const mapValores = mapMeses.get(mes) || []
      mapValores.push(produto)
      mapMeses.set(mes, mapValores)
    }
    return mapMeses;
  }

  
  criaArray(): any[]{
    return new Array(this.orcamentoService.getByYear(this.mes.data?.getMonth()));

}

meses:any[] = this.criaArray();

}
