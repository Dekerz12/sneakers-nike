import { useSneakers } from './SneakerContext';
export default function Total() {
  const { filteredSneakers } = useSneakers();
  return <h4>Shoes ({filteredSneakers?.length})</h4>;
}
