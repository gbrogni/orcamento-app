export class Orcamento{
    codEmpresa:number;
    tipo:string;
    data:Date;
    codProduto: number;
    nomeProduto:string;
    qtde:number;
    custoUni: number | null;
    valorVenda:number;
    custoTotal:number | null;
    
    constructor(codEmpresa:number,tipo:string,data:Date,codProduto:number,nomeProduto:string,qtde:number,custoUni:number,valorVenda:number,custoTotal:number){
        this.codEmpresa=codEmpresa;
        this.tipo=tipo;
        this.data=data;
        this.codProduto=codProduto;
        this.nomeProduto=nomeProduto;
        this.qtde=qtde;
        this.custoUni=custoUni;
        this.valorVenda=valorVenda;
        this.custoTotal=custoTotal;
    }
}

export default interface AnoConsult{
    AnoConsult: number;
    datas: Date;
}