export interface ProdutoTypes {
  id: string;
  idSecundario: number;
  idEmpresa: number;
  idFamilia?: number;
  idProduto: number;
  idGrupo: string;
  acrescimo?: number;
  ativo: string;
  desconto?: number;
  estoque: number;
  fornecedor: number;
  linha?: string;
  multiploVenda: number;
  nome: string;
  nomeGrupo: string;
  nomeFamilia?: string;
  pesada: string;
  preco: number;
  referencia?: string;
  unidadeCaixa: number;
  unidadeFisica: string;
  unidadeVenda: number;
}
