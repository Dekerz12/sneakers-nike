import { useSneakers } from "./SneakerContext";
import ColorFilter from "./categories/ColorFilter";
import BrandFilter from "./categories/BrandFilter";
import ShoeConditionFilter from "./categories/ShoeConditionFilter";
import SizeFilter from "./categories/SizeFilter";
export default function Sidebar() {
  const { isSidebarOpen, query, setQuery } = useSneakers();
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="sidebar" style={{ width: isSidebarOpen ? "15em" : "0" }}>
      <input type="text" value={query} onChange={handleSearch} autoFocus />
      <ColorFilter />
      <BrandFilter />
      <ShoeConditionFilter />
      <SizeFilter />
    </div>
  );
}
