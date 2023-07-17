import { useSneakers } from './SneakerContext';
import Sneaker from './Sneaker';

export default function SneakerList() {
  const { filteredSneakers, isInitialLoading } = useSneakers();

  if (isInitialLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='gallery'>
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
