import { HeaderService } from './../template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { OrcamentoService } from './orcamento.service';
import { Orcamento } from './orcamento.model';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss'],
  providers: [OrcamentoService]
})
export class OrcamentoComponent implements OnInit {
  orcamentos: Orcamento[] = [{
    codEmpresa: 0,
    codProduto: 0,
    nomeProduto: '',
    qtde: 0,
    custoUni: 0,
    valorVenda: 0,
    custoTotal: 0
  }]

  displayedColumns: string[] = ['codEmpresa', 'codProduto', 'nomeProduto', 'qtde', 'custoUni', 'valorVenda', 'custoTotal'];

  constructor(public orcamentoService: OrcamentoService, private headerService: HeaderService) { 
    this.orcamentoService.getProdutos().subscribe(orcamentos => {this.orcamentos = orcamentos})
    headerService.headerData = {
      title: 'Orçamento',
      icon: 'home',
      routeUrl:''
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.loadProdutos()
  }

  public hide:boolean=true;
  dataSource:Orcamento[] = [];

  loadProdutos(){
    this.orcamentoService.getProdutos().subscribe(orcamentos=>{
      this.dataSource=orcamentos;
    })
  }

}
