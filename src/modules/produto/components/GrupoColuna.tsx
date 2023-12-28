import { Tag } from 'antd';

import { ProdutoTypes } from '../types/ProdutoTypes';

interface GrupoColunaProps {
  nomeGrupo?: ProdutoTypes;
}

const colors: string[] = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

const GrupoColuna = ({ nomeGrupo }: GrupoColunaProps) => {
  if (!nomeGrupo) return null;

  const currentColor = colors[nomeGrupo.nomeGrupo.length - 1] || colors[0];

  return <Tag color={currentColor}>{nomeGrupo.nomeGrupo}</Tag>;
};

export default GrupoColuna;
