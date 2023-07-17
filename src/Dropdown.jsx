import { useSneakers } from './SneakerContext';

export default function Dropdown() {
  const { sortedBy, setSortedBy } = useSneakers();
  const handleChange = (event) => {
    setSortedBy(event.target.value);
  };
  return (
    <select value={sortedBy} onChange={handleChange}>
      <option value='a-z'>A-Z</option>
      <option value='z-a'>Z-A</option>
      <option value='oldest'>Oldest</option>
      <option value='latest'>Latest</option>
      <option value='high to low'>High to Low</option>
      <option value='low to high'>Low to High</option>
    </select>
  );
}
