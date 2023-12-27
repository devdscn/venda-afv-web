import Screen from '../../../shared/components/screen/Screen';
import { ProdutoRoutesEnum } from '../routes';

const ProdutoConsultar = () => {
  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PRODUTOS',
          navigateTo: ProdutoRoutesEnum.PRODUTO_EMPRESA,
        },

        {
          name: 'CONSULTAR PRODUTOS',
        },
      ]}
    >
      Consultar produto
    </Screen>
  );
};
export default ProdutoConsultar;
