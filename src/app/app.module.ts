import { OrcamentoComponent } from './components/orcamento/orcamento.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabelaComponent } from './views/tabela/tabela.component';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    OrcamentoComponent,
    HeaderComponent,
    FooterComponent,
    TabelaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSnackBarModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
