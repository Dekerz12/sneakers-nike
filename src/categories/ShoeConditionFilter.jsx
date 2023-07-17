import { useState } from 'react';
import { useSneakers } from '../SneakerContext';

export default function ShoeConditionFilter() {
  const { shoeCondition, selectedShoeCondition, handleSelectedShoeCondition } =
    useSneakers();
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <h5>Shoe Condition</h5>
      <div className='gallery2'>
        {shoeCondition?.map((shoe) => (
          <div
            key={shoe}
            onClick={() => {
              handleSelectedShoeCondition(shoe);
            }}
            style={{ cursor: 'pointer' }}>
            <input
              type='checkbox'
              id={shoe}
              checked={selectedShoeCondition.includes(shoe) ? true : false}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor='shoe'>{shoe.replaceAll('_', ' ')}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
