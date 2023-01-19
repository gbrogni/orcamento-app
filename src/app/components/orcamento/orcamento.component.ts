import { MatSelectModule } from '@angular/material/select';
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




  displayedColumns: string[] = ['codProduto', 'nomeProduto', 'custoUni', 'vendaJaneiro', 'custoJaneiro', 'AVJan', 'AV1', 'CxVJan', 'vendaFevereiro', 'custoFevereiro', 'AVFev', 'AV2',
    'CxVFev', 'vendaMarço', 'custoMarço', 'AVMar', 'AV3', 'CxVMar', 'vendaAbril', 'custoAbril', 'AVAbr', 'AV4', 'CxVAbr', 'vendaMaio', 'custoMaio', 'AVMai', 'AV5', 'CxVMai',
    'vendaJunho', 'custoJunho', 'AVJun', 'AV6', 'CxVJun', 'vendaJulho', 'custoJulho', 'AVJul', 'AV7', 'CxVJul', 'vendaAgosto', 'custoAgosto', 'AVAgo', 'AV8', 'CxVAgo', 'vendaSetembro',
    'custoSetembro', 'AVSet', 'AV9', 'CxVSet', 'vendaOutubro', 'custoOutubro', 'AVOut', 'AV10', 'CxVOut', 'vendaNovembro', 'custoNovembro', 'AVNov', 'AV11', 'CxVNov', 'vendaDezembro',
    'custoDezembro', 'AVDez', 'AV12', 'CxVDez', 'valorVenda', 'AVSoma', 'custoTotal', 'AVCusto'];
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
  show!: boolean;
  showed!: boolean;
  hidden!: boolean;
  hiddenn!: boolean;
  somaJan: number = 0;
  somaFev: number = 0;
  somaMar: number = 0;
  somaAbr: number = 0;
  somaMai: number = 0;
  somaJun: number = 0;
  somaJul: number = 0;
  somaAgo: number = 0;
  somaSet: number = 0;
  somaOut: number = 0;
  somaNov: number = 0;
  somaDez: number = 0;
  custoJan: number = 0;
  custoFev: number = 0;
  custoMar: number = 0;
  custoAbr: number = 0;
  custoMai: number = 0;
  custoJun: number = 0;
  custoJul: number = 0;
  custoAgo: number = 0;
  custoSet: number = 0;
  custoOut: number = 0;
  custoNov: number = 0;
  custoDez: number = 0;
  somaTotal: number = 0;
  custosTotal: number = 0;
  mediaUni: number = 0;
  AVList: any = [];

  ngOnInit(): void {
    this.hidden = false;
    this.hiddenn = false;
    this.visible = false;
    this.show = true;
    this.showed = true;
  }

  ocultaVenda() {
    this.hidden = !this.hidden;
  }

  ocultaAV() {
    this.show = !this.show;
  }

  ocultaCxV() {
    this.showed = !this.showed;
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

  mediaCustoUnitario() {
    let total = this.orcamentos.map(t => t.custoUni!).reduce((acc, value) => acc + value, 0)
    let count = this.countDistinct(this.orcamentos)
    return total / count;
  }

  countDistinct(arr: any) {
    return new Set(arr).size;
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

        this.somaJan += orcamento[i].Janeiro.valorVenda;
        this.somaFev += orcamento[i].Fevereiro.valorVenda;
        this.somaMar += orcamento[i].Março.valorVenda;
        this.somaAbr += orcamento[i].Abril.valorVenda;
        this.somaMai += orcamento[i].Maio.valorVenda;
        this.somaJun += orcamento[i].Junho.valorVenda;
        this.somaJul += orcamento[i].Julho.valorVenda;
        this.somaAgo += orcamento[i].Agosto.valorVenda;
        this.somaSet += orcamento[i].Setembro.valorVenda;
        this.somaOut += orcamento[i].Outubro.valorVenda;
        this.somaNov += orcamento[i].Novembro.valorVenda;
        this.somaDez += orcamento[i].Dezembro.valorVenda;

        this.custoJan += orcamento[i].Janeiro.custoTotal;
        this.custoFev += orcamento[i].Fevereiro.custoTotal;
        this.custoMar += orcamento[i].Março.custoTotal;
        this.custoAbr += orcamento[i].Abril.custoTotal;
        this.custoMai += orcamento[i].Maio.custoTotal;
        this.custoJun += orcamento[i].Junho.custoTotal;
        this.custoJul += orcamento[i].Julho.custoTotal;
        this.custoAgo += orcamento[i].Agosto.custoTotal;
        this.custoSet += orcamento[i].Setembro.custoTotal;
        this.custoOut += orcamento[i].Outubro.custoTotal;
        this.custoNov += orcamento[i].Novembro.custoTotal;
        this.custoDez += orcamento[i].Dezembro.custoTotal;

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
        let somas: any = {};
        somas['soma'] = { somavendas, somaCustos }
        prod = { ...prod, ...somas }
        orcamento[i] = prod
        this.somaTotal += somavendas;
        this.custosTotal += somaCustos;
        i++;
      }

      for (let j = 0; j < orcamento.length; j++) {
        let AvJaneiro: number = 0
        if (orcamento[j].Janeiro.valorVenda != 0) {
          let custoItemJan: number = orcamento[j].Janeiro.valorVenda
          AvJaneiro = (custoItemJan * 100) / this.somaJan
        }
        let AvJanCusto: number = 0
        if (orcamento[j].Janeiro.custoTotal != 0) {
          let custoItemJan: number = orcamento[j].Janeiro.custoTotal
          AvJanCusto = (custoItemJan * 100) / this.custoJan
        }
        let AvFev: number = 0
        if (orcamento[j].Fevereiro.valorVenda != 0) {
          let custoItemJan: number = orcamento[j].Fevereiro.valorVenda
          AvFev = (custoItemJan * 100) / this.somaFev
        }
        let AvFevCusto: number = 0
        if (orcamento[j].Fevereiro.custoTotal != 0) {
          let custoItemJan: number = orcamento[j].Fevereiro.custoTotal
          AvFevCusto = (custoItemJan * 100) / this.custoFev
        }
        let AvMar: number = 0
        if (orcamento[j].Março.valorVenda != 0) {
          let custoItemJan: number = orcamento[j].Março.valorVenda
          AvMar = (custoItemJan * 100) / this.somaMar
        }
        let AvMarCusto: number = 0
        if (orcamento[j].Março.custoTotal != 0) {
          let custoItemJan: number = orcamento[j].Março.custoTotal
          AvMarCusto = (custoItemJan * 100) / this.custoMar
        }
        let AvAbr: number = 0
        if (orcamento[j].Abril.valorVenda != 0) {
          let custoItemJan: number = orcamento[j].Abril.valorVenda
          AvAbr = (custoItemJan * 100) / this.somaAbr
        }
        let AvAbrCusto: number = 0
        if (orcamento[j].Abril.custoTotal != 0) {
          let custoItemJan: number = orcamento[j].Abril.custoTotal
          AvAbrCusto = (custoItemJan * 100) / this.custoAbr
        }
        let AvMai: number = 0
        if (orcamento[j].Maio.valorVenda != 0) {
          let custoItemJan: number = orcamento[j].Maio.valorVenda
          AvMai = (custoItemJan * 100) / this.somaMai
        }
        let AvMaiCusto: number = 0
        if (orcamento[j].Maio.custoTotal != 0) {
          let custoItemJan: number = orcamento[j].Maio.custoTotal
          AvMaiCusto = (custoItemJan * 100) / this.custoMai
        }
        let AvJun: number = 0
        if (orcamento[j].Junho.valorVenda != 0) {
          let custoItemJan: number = orcamento[j].Junho.valorVenda
          AvJun = (custoItemJan * 100) / this.somaJun
        }
        let AvJunCusto: number = 0
        if (orcamento[j].Junho.custoTotal != 0) {
          let custoItemJan: number = orcamento[j].Junho.custoTotal
          AvJunCusto = (custoItemJan * 100) / this.custoJun
        }
        let AvJul: number = 0
        if (orcamento[j].Julho.valorVenda != 0) {
          let custoItemJan: number = orcamento[j].Julho.valorVenda
          AvJul = (custoItemJan * 100) / this.somaJul
        }
        let AvJulCusto: number = 0
        if (orcamento[j].Julho.custoTotal != 0) {
          let custoItemJan: number = orcamento[j].Julho.custoTotal
          AvJulCusto = (custoItemJan * 100) / this.custoJul
        }
        let AvAgo: number = 0
        if (orcamento[j].Agosto.valorVenda != 0) {
          let custoItemJan: number = orcamento[j].Agosto.valorVenda
          AvAgo = (custoItemJan * 100) / this.somaAgo
        }
        let AvAgoCusto: number = 0
        if (orcamento[j].Agosto.custoTotal != 0) {
          let custoItemJan: number = orcamento[j].Agosto.custoTotal
          AvAgoCusto = (custoItemJan * 100) / this.custoAgo
        }
        let AvSet: number = 0
        if (orcamento[j].Setembro.valorVenda != 0) {
          let custoItemJan: number = orcamento[j].Setembro.valorVenda
          AvSet = (custoItemJan * 100) / this.somaSet
        }
        let AvSetCusto: number = 0
        if (orcamento[j].Setembro.custoTotal != 0) {
          let custoItemJan: number = orcamento[j].Setembro.custoTotal
          AvSetCusto = (custoItemJan * 100) / this.custoSet
        }
        let AvOut: number = 0
        if (orcamento[j].Outubro.valorVenda != 0) {
          let custoItemJan: number = orcamento[j].Outubro.valorVenda
          AvOut = (custoItemJan * 100) / this.somaOut
        }
        let AvOutCusto: number = 0
        if (orcamento[j].Outubro.custoTotal != 0) {
          let custoItemJan: number = orcamento[j].Outubro.custoTotal
          AvOutCusto = (custoItemJan * 100) / this.custoOut
        }
        let AvNov: number = 0
        if (orcamento[j].Novembro.valorVenda != 0) {
          let custoItemJan: number = orcamento[j].Novembro.valorVenda
          AvNov = (custoItemJan * 100) / this.somaNov
        }
        let AvNovCusto: number = 0
        if (orcamento[j].Novembro.custoTotal != 0) {
          let custoItemJan: number = orcamento[j].Novembro.custoTotal
          AvNovCusto = (custoItemJan * 100) / this.custoNov
        }
        let AvDez: number = 0
        if (orcamento[j].Dezembro.valorVenda != 0) {
          let custoItemJan: number = orcamento[j].Dezembro.valorVenda
          AvDez = (custoItemJan * 100) / this.somaDez
        }
        let AvDezCusto: number = 0
        if (orcamento[j].Dezembro.custoTotal != 0) {
          let custoItemJan: number = orcamento[j].Dezembro.custoTotal
          AvDezCusto = (custoItemJan * 100) / this.custoDez
        }
        let AvSoma: number = 0
        if (orcamento[j].soma.somavendas != 0) {
          let custoItemJan: number = orcamento[j].soma.somavendas
          AvSoma = (custoItemJan * 100) / this.somaTotal
        }
        let AvCusto: number = 0
        if (orcamento[j].soma.somaCustos != 0) {
          let custoItemJan: number = orcamento[j].soma.somaCustos
          AvCusto = (custoItemJan * 100) / this.custosTotal
        }

        let Av: any = {}
        Av['Avs'] = {
          AvJaneiro, AvJanCusto, AvFev, AvFevCusto, AvMar, AvMarCusto, AvAbr, AvAbrCusto, AvMai, AvMaiCusto, AvJun, AvJunCusto, AvJul, AvJulCusto,
          AvAgo, AvAgoCusto, AvSet, AvSetCusto, AvOut, AvOutCusto, AvNov, AvNovCusto, AvDez, AvDezCusto, AvSoma, AvCusto
        }
        orcamento[j] = { ...orcamento[j], ...Av }

        if (orcamento[j].Janeiro.valorVenda != 0) {
          let vendaItemJan: number = orcamento[j].Janeiro.valorVenda
          let custo: number = orcamento[j].Janeiro.custoTotal
          AvJaneiro = (vendaItemJan - custo) / vendaItemJan * 100
        }
        if (orcamento[j].Fevereiro.valorVenda != 0) {
          let vendaItemJan: number = orcamento[j].Fevereiro.valorVenda
          let custo: number = orcamento[j].Fevereiro.custoTotal
          AvFev = (vendaItemJan - custo) / vendaItemJan * 100
        }
        if (orcamento[j].Março.valorVenda != 0) {
          let vendaItemJan: number = orcamento[j].Março.valorVenda
          let custo: number = orcamento[j].Março.custoTotal
          AvMar = (vendaItemJan - custo) / vendaItemJan * 100
        }
        if (orcamento[j].Abril.valorVenda != 0) {
          let vendaItemJan: number = orcamento[j].Abril.valorVenda
          let custo: number = orcamento[j].Abril.custoTotal
          AvAbr = (vendaItemJan - custo) / vendaItemJan * 100
        }
        if (orcamento[j].Maio.valorVenda != 0) {
          let vendaItemJan: number = orcamento[j].Maio.valorVenda
          let custo: number = orcamento[j].Maio.custoTotal
          AvMai = (vendaItemJan - custo) / vendaItemJan * 100
        }
        if (orcamento[j].Junho.valorVenda != 0) {
          let vendaItemJan: number = orcamento[j].Junho.valorVenda
          let custo: number = orcamento[j].Junho.custoTotal
          AvJun = (vendaItemJan - custo) / vendaItemJan * 100
        }
        if (orcamento[j].Julho.valorVenda != 0) {
          let vendaItemJan: number = orcamento[j].Julho.valorVenda
          let custo: number = orcamento[j].Julho.custoTotal
          AvJul = (vendaItemJan - custo) / vendaItemJan * 100
        }
        if (orcamento[j].Agosto.valorVenda != 0) {
          let vendaItemJan: number = orcamento[j].Agosto.valorVenda
          let custo: number = orcamento[j].Agosto.custoTotal
          AvAgo = (vendaItemJan - custo) / vendaItemJan * 100
        }
        if (orcamento[j].Setembro.valorVenda != 0) {
          let vendaItemJan: number = orcamento[j].Setembro.valorVenda
          let custo: number = orcamento[j].Setembro.custoTotal
          AvSet = (vendaItemJan - custo) / vendaItemJan * 100
        }
        if (orcamento[j].Outubro.valorVenda != 0) {
          let vendaItemJan: number = orcamento[j].Outubro.valorVenda
          let custo: number = orcamento[j].Outubro.custoTotal
          AvOut = (vendaItemJan - custo) / vendaItemJan * 100
        }
        if (orcamento[j].Novembro.valorVenda != 0) {
          let vendaItemJan: number = orcamento[j].Novembro.valorVenda
          let custo: number = orcamento[j].Novembro.custoTotal
          AvNov = (vendaItemJan - custo) / vendaItemJan * 100
        }
        if (orcamento[j].Dezembro.valorVenda != 0) {
          let vendaItemJan: number = orcamento[j].Dezembro.valorVenda
          let custo: number = orcamento[j].Dezembro.custoTotal
          AvDez = (vendaItemJan - custo) / vendaItemJan * 100
        }

        console.log(orcamento[j])

        let Lucro: any = {}
        Lucro['Lucros'] = {
          AvJaneiro, AvFev, AvMar, AvAbr, AvMai, AvJun, AvJul, AvAgo, AvSet, AvOut, AvNov, AvDez
        }

        orcamento[j] = { ...orcamento[j], ...Lucro }
      }


      this.orcamentos = orcamento;

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
