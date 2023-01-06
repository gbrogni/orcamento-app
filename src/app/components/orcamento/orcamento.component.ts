import { MatSelectModule } from '@angular/material/select';
import { HeaderService } from './../template/header/header.service';
import { Component, Inject, OnInit } from '@angular/core';
import { OrcamentoService } from './orcamento.service';
import AnoConsult, { Orcamento } from './orcamento.model';
import { ActivatedRoute } from '@angular/router';

export interface ano {
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
    codEmpresa: 0,
    tipo: 'string',
    data: new Date(),
    codProduto: 0,
    nomeProduto: 'string',
    qtde: 0,
    custoUni: 0,
    valorVenda: 0,
    custoTotal: 0,
  }]

  displayedColumns: string[] = ['codProduto', 'nomeProduto', 'custoUni', 'valorVenda', 'custoTotal', 'vendaJaneiro', 'custoJaneiro', 'vendaFevereiro', 'custoFevereiro',
    'vendaMarço', 'custoMarço', 'vendaAbril', 'custoAbril', 'vendaMaio', 'custoMaio', 'vendaJunho', 'custoJunho', 'vendaJulho', 'custoJulho', 'vendaAgosto', 'custoAgosto',
    'vendaSetembro', 'custoSetembro', 'vendaOutubro', 'custoOutubro', 'vendaNovembro', 'custoNovembro', 'vendaDezembro', 'custoDezembro'];
  dataSource: Orcamento[] = [];

  Anos: ano[] = [
    { anoValue: '2019', anoViewValue: '2019' },
    { anoValue: '2020', anoViewValue: '2020' },
  ]

  constructor(
    public orcamentoService: OrcamentoService,
    private headerService: HeaderService,
    @Inject(MatSelectModule) public data: AnoConsult,
    @Inject(MatSelectModule) public mes: Orcamento,
    public route: ActivatedRoute
  ) {
    headerService.headerData = {
      title: 'Orçamento',
      icon: 'home',
      routeUrl: ''
    }
  }


  hidden!: boolean;
  hiddenn!: boolean;


  ngOnInit(): void {
    this.hidden = false;
  }

  ocultaVenda() {
    this.hidden = !this.hidden;
  }

  ocultaCusto() {
    this.hiddenn = !this.hiddenn;
  }

  consultar() {
    this.orcamentoService.getProdutos(this.data.AnoConsult).subscribe(orcamentosdados => {
      this.orcamentos = orcamentosdados;
    })
  }

  transformaMes(mesEmNumero: number) {
    return {
      0: 'Janeiro',
      1: 'Fevereiro',
      2: 'Março',
      3: 'Abril',
      4: 'Maio',
      5: 'Junho',
      6: 'Julho',
      7: 'Agosto',
      8: 'Setembro',
      9: 'Outubro',
      10: 'Novembro',
      11: 'Dezembro'
    }[mesEmNumero]
  }

  calcular() {
    this.orcamentoService.getByYear(this.data.AnoConsult).subscribe(orcamentosdados => {
      let orcamentomap = this.agrupaProd(orcamentosdados);
      let orcamento = [];
      for (const [codProduto, produtos] of orcamentomap) {
        const mesMap = this.agrupaProdMes(produtos)
        let [prod] = produtos;
        let produtoMes: any = {};
        ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map((mes: string) => {
          produtoMes[mes] = {
            custoTotal: 0,
            valorVenda: 0
          }
        })
        for (const [data, prodMeses] of mesMap) {
          const custoTotal = prodMeses.reduce((prev: number, next: any) => prev + next.custoTotal, 0)
          const valorVenda = prodMeses.reduce((prev: number, next: any) => prev + next.valorVenda, 0)
          const mes = this.transformaMes(data)
          produtoMes = {
            ...produtoMes,
            [mes as string]: {
              custoTotal,
              valorVenda
            }
          }
        }
        prod = { ...prod, ...produtoMes }
        orcamento.push(prod)
      }
      console.log(orcamento)
      console.log(orcamentomap)
      this.orcamentos = orcamento;
    })
  }

  agrupaProd(produtos: any[]) {
    const mapProdutos = new Map()
    for (const produto of produtos) {
      const mapValores = mapProdutos.get(produto.codProduto) || []
      mapValores.push(produto)
      mapProdutos.set(produto.codProduto, mapValores)
    }
    return mapProdutos;
  }

  agrupaProdMes(produtos: any[]) {
    const mapMeses = new Map()
    for (const produto of produtos) {
      const data = new Date(produto.data).getMonth()
      const mapValores = mapMeses.get(data) || []
      mapValores.push(produto)
      mapMeses.set(data, mapValores)
    }
    return mapMeses;
  }

}
