import { useSneakers } from './Context/SneakerContext';
import useToggle from './customhooks/useToggle';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import Colors from './Categories/Colors';
import Brands from './Categories/Brands';
import ShoeConditions from './Categories/ShoeConditions';
import Sizes from './Categories/Sizes';
export default function Sidebar() {
  const { isSidebarOpen, query, setQuery } = useSneakers();
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div
      className='sidebar flex column'
      style={{
        flexBasis: isSidebarOpen ? '15em' : '0',
        gap: '.3em',
      }}>
      <label htmlFor='search'>Search</label>
      <input
        id='search'
        type='text'
        value={query}
        onChange={handleSearch}
        autoFocus
      />

      <FilterOption name={'Colors'}>
        <Colors />
      </FilterOption>
      <FilterOption name={'Brand'}>
        <Brands />
      </FilterOption>
      <FilterOption name={'Shoe Condition'}>
        <ShoeConditions />
      </FilterOption>
      <FilterOption name={'Size'}>
        <Sizes />
      </FilterOption>
    </div>
  );
}

function FilterOption({ name = 'Name', children }) {
  const [dropdown, toggleDropdown] = useToggle(true);

  return (
    <>
      <div className='flex space-between align' style={{ marginBottom: '1em' }}>
        <span>{name}</span>
        {dropdown ? (
          <BsChevronUp onClick={toggleDropdown} />
        ) : (
          <BsChevronDown onClick={toggleDropdown} />
        )}
      </div>
      {dropdown && children}
    </>
  );
}
