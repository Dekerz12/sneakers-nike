import { useSneakers } from './SneakerContext';
import ColorFilter from './categories/ColorFilter';
import BrandFilter from './categories/BrandFilter';
import ShoeConditionFilter from './categories/ShoeConditionFilter';
import SizeFilter from './categories/SizeFilter';
export default function Sidebar() {
  const { isSidebarOpen, query, setQuery } = useSneakers();
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  if (isSidebarOpen) {
    return (
      <div className='sidebar'>
        <input type='text' value={query} onChange={handleSearch} autoFocus />
        <ColorFilter />
        <BrandFilter />
        <ShoeConditionFilter />
        <SizeFilter />
      </div>
    );
  }
}
