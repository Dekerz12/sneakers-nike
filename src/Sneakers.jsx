import { useSneakers } from './Context/SneakerContext';
import Sneaker from './Sneaker';
import Sidebar from './Sidebar';
export default function Sneakers() {
  return (
    <div className='flex'>
      <Sidebar />
      <SneakerList />
    </div>
  );
}

function SneakerList() {
  const { filteredSneakers, isInitialLoading } = useSneakers();

  if (isInitialLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className='gallery flex1'>
      {filteredSneakers.length > 0 ? (
        filteredSneakers?.map((sneaker) => (
          <Sneaker key={sneaker.id} {...sneaker} />
        ))
      ) : (
        <h2>No Results</h2>
      )}
    </div>
  );
}
