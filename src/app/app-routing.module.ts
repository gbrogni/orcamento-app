import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrcamentoComponent } from './components/orcamento/orcamento.component';
import { TabelaComponent } from './views/tabela/tabela.component';

const routes: Routes = [{
  path: "",
  component: TabelaComponent
},{
  path: "orcamento",
  component: OrcamentoComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
