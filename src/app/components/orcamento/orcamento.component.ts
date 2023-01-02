import { MatSelectModule } from '@angular/material/select';
import { HeaderService } from './../template/header/header.service';
import {  Component, Inject, OnInit } from '@angular/core';
import { OrcamentoService } from './orcamento.service';
import AnoConsult, { Orcamento } from './orcamento.model';

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
  orcamentos: Orcamento[] = [{ }]

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
    ) 
    { 
    headerService.headerData = {
      title: 'Orçamento',
      icon: 'home',
      routeUrl:''
    }
  }

  ngOnInit(): void {
  }


  consultar(){
    this.orcamentoService.getByYear(this.data.AnoConsult).subscribe(orcamentosdados=>{
      this.orcamentos = orcamentosdados;
    })
  }

  calcular(){
    this.orcamentoService.getProdutos(this.data.AnoConsult).subscribe(orcamentosdados=>{
      this.orcamentos=orcamentosdados;
    })
  }


}
