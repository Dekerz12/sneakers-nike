import { useSneakers } from './Context/SneakerContext';

import { LuSettings2 } from 'react-icons/lu';
export default function SidebarToggleButton() {
  const { isSidebarOpen, toggleIsSidebarOpen } = useSneakers();
  return (
    <button
      style={{
        border: 'none',
        padding: '.5em',
        gap: '.2em',
      }}
      onClick={toggleIsSidebarOpen}
      className='flex center'>
      <span style={{ fontSize: '.9em' }}>
        {isSidebarOpen ? 'Hide' : 'Show'} Filters
      </span>
      <LuSettings2 />
    </button>
  );
}
