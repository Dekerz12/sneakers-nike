import { useState } from 'react';
import { useSneakers } from '../SneakerContext';

export default function SizeFilter() {
  const { size, selectedSize, handleSelectedSize } = useSneakers();

  return (
    <div>
      <h5>Size</h5>
      <div className='size-gallery'>
        {size?.map((s) => (
          <div
            key={s}
            onClick={() => {
              handleSelectedSize(s);
            }}
            style={{ cursor: 'pointer' }}>
            <button
              style={{
                outline: selectedSize.includes(s) ? '2px solid black' : 'none',
                padding: '0.2em',
                width: '100%',
              }}>
              {s}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
