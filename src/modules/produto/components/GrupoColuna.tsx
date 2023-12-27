import { Tag } from 'antd';

import { ProdutoTypes } from '../types/ProdutoTypes';

interface GrupoColunaProps {
  nomeGrupo?: ProdutoTypes;
}

const colors: string[] = [
  'green',
  'red',
  'orange',
  'gold',
  'volcano',
  'cyan',
  'magenta',
  'blue',
  'geekblue',
  'purple',
  'lime',
];

const GrupoColuna = ({ nomeGrupo }: GrupoColunaProps) => {
  if (!nomeGrupo) return null;

  const currentColor = colors[nomeGrupo.nomeGrupo.length - 1] || colors[0];

  return <Tag color={currentColor}>{nomeGrupo.nomeGrupo}</Tag>;
};

export default GrupoColuna;
