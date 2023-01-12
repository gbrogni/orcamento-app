import { MatSelectModule } from '@angular/material/select';
import { Component, Inject, OnInit } from '@angular/core';
import { OrcamentoService } from './orcamento.service';
import AnoConsult,  { Orcamento } from './orcamento.model';
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

  


  displayedColumns: string[] = ['codProduto', 'nomeProduto', 'custoUni',  'vendaJaneiro', 'custoJaneiro', 'vendaFevereiro', 'custoFevereiro',
    'vendaMarço', 'custoMarço', 'vendaAbril', 'custoAbril', 'vendaMaio', 'custoMaio', 'vendaJunho', 'custoJunho', 'vendaJulho', 'custoJulho', 'vendaAgosto', 'custoAgosto',
    'vendaSetembro', 'custoSetembro', 'vendaOutubro', 'custoOutubro', 'vendaNovembro', 'custoNovembro', 'vendaDezembro', 'custoDezembro', 'valorVenda', 'custoTotal'];
  dataSource: Orcamento[] = [];

  Anos: ano[] = [
    { anoValue: '2019', anoViewValue: '2019' },
    { anoValue: '2020', anoViewValue: '2020' },
  ]


  constructor(
    public orcamentoService: OrcamentoService,
    @Inject(MatSelectModule) public data: AnoConsult,
    @Inject(MatSelectModule) public mes: Orcamento,
    public route: ActivatedRoute
  ) { }

  count = 0;
  hidden!: boolean;
  hiddenn!: boolean;


  ngOnInit(): void {
    this.hidden = false;
    this.visible = false;
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

  visible!: boolean;

  Visible() {
    if (this.visible == false) {
      this.visible = true
    }
  }

  getCount() {
    this.orcamentoService.getCountRecord(this.data.AnoConsult).subscribe((orcamentodados: any) => {
      this.count = orcamentodados;
    })
  }

  calcular() {
    this.orcamentoService.getByYear(this.data.AnoConsult).subscribe(orcamentosdados => {
      let orcamentomap = this.agrupaProd(orcamentosdados);
      let orcamento = [];
      let i = 0;
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

        let somavendas = 0;
        somavendas += orcamento[i].Janeiro.valorVenda;
        somavendas += orcamento[i].Fevereiro.valorVenda;
        somavendas += orcamento[i].Março.valorVenda;
        somavendas += orcamento[i].Abril.valorVenda;
        somavendas += orcamento[i].Maio.valorVenda;
        somavendas += orcamento[i].Junho.valorVenda;
        somavendas += orcamento[i].Julho.valorVenda;
        somavendas += orcamento[i].Agosto.valorVenda;
        somavendas += orcamento[i].Setembro.valorVenda;
        somavendas += orcamento[i].Outubro.valorVenda;
        somavendas += orcamento[i].Novembro.valorVenda;
        somavendas += orcamento[i].Dezembro.valorVenda;

        let somaCustos = 0;
        somaCustos += orcamento[i].Janeiro.custoTotal;
        somaCustos += orcamento[i].Fevereiro.custoTotal;
        somaCustos += orcamento[i].Março.custoTotal;
        somaCustos += orcamento[i].Abril.custoTotal;
        somaCustos += orcamento[i].Maio.custoTotal;
        somaCustos += orcamento[i].Junho.custoTotal;
        somaCustos += orcamento[i].Julho.custoTotal;
        somaCustos += orcamento[i].Agosto.custoTotal;
        somaCustos += orcamento[i].Setembro.custoTotal;
        somaCustos += orcamento[i].Outubro.custoTotal;
        somaCustos += orcamento[i].Novembro.custoTotal;
        somaCustos += orcamento[i].Dezembro.custoTotal;
        let somas: any = { };
        somas['soma'] = {somavendas, somaCustos}
        prod = {...prod, ...somas}
        orcamento[i] = prod
        i++;
      }
      this.orcamentos = orcamento;
      console.log(this.orcamentos)
    
    })
    this.getCount()
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
