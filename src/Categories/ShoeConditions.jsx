import { useState } from 'react';
import { useSneakers } from '../Context/SneakerContext';

export default function ShoeConditions() {
  const { shoeCondition, selectedShoeCondition, handleSelectedShoeCondition } =
    useSneakers();
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <div>
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
