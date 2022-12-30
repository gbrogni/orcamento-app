import { MatTableDataSource } from '@angular/material/table';
import { HeaderService } from './../template/header/header.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OrcamentoService } from './orcamento.service';
import { Orcamento } from './orcamento.model';
import { MatPaginator } from '@angular/material/paginator';


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

  displayedColumns: string[] = ['codProduto', 'nomeProduto', 'custoUni', 'valorVenda', 'custoTotal'];
  dataSource: Orcamento[] = [];



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

  loadProdutos(){
    this.orcamentoService.getProdutos().subscribe(orcamentos=>{
      this.dataSource=orcamentos;
    })
  }

}
