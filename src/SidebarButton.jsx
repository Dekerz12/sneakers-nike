import { useSneakers } from './SneakerContext';
import { LuSettings2 } from 'react-icons/lu';
export default function SidebarButton() {
  const { isSidebarOpen, toggleIsSidebarOpen } = useSneakers();
  return (
    <div
      role='button'
      style={{ border: 'none' }}
      onClick={toggleIsSidebarOpen}
      className='flex space-between'>
      <span>{isSidebarOpen ? 'Hide' : 'Show'} Filters</span> <LuSettings2 />
    </div>
  );
}
