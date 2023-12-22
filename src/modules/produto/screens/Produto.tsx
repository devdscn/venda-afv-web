import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';

const Produto = () => {
  const { user } = useGlobalContext();
  return <div>`Produto ${user?.id}`</div>;
};
export default Produto;
