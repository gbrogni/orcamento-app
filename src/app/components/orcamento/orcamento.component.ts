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
  }

  ocultaVenda(){
    this.hidden = !this.hidden;
}

  ocultaCusto(){
  this.hiddenn = !this.hiddenn;
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
