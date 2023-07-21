import { useState } from 'react';
import { useSneakers } from '../Context/SneakerContext';
export default function Brands() {
  const { brands, selectedBrands, handleSelectedBrands } = useSneakers();
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <div>
        {brands?.map((brand) => (
          <div
            key={brand}
            onClick={() => handleSelectedBrands(brand)}
            style={{ cursor: 'pointer' }}>
            <input
              type='checkbox'
              id={brand}
              checked={selectedBrands.includes(brand) ? true : false}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor='brand'>{brand}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
