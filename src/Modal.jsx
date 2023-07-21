import { useState } from 'react';
import { useSneakers } from './Context/SneakerContext';

export default function Modal({ close, prop }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const {
    id,
    main_picture_url,
    grid_picture_url,
    story_html,
    name,
    gender,
    retail_price_cents,
    size_range,
  } = prop;
  const { favorites, setFavorites, cartItems, setCartItems } = useSneakers();
  const index = cartItems.findIndex(
    (cart) => cart.id == id && cart.selectedSize == selectedSize
  );
  function handleFavoriteButtonClick(e) {
    e.stopPropagation();
    if (favorites.includes(name)) {
      setFavorites((prev) =>
        prev.filter((favSneakerName) => favSneakerName !== name)
      );
    } else {
      setFavorites((prev) => [...prev, name]);
    }
  }

  function handleAddToCartClick() {
    if (selectedSize) {
      if (index === -1) {
        setCartItems((pre) => [
          ...pre,
          {
            id,
            name,
            selectedSize,
            retail_price_cents,
            gender,
            quantity: 1,
            grid_picture_url,
          },
        ]);
      } else {
        setCartItems((pre) =>
          pre.map((item) => {
            if (item.selectedSize === cartItems[index].selectedSize) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          })
        );
      }
    }
  }

  return (
    <dialog open onClick={close}>
      <article className='modal-card' onClick={(e) => e.stopPropagation()}>
        <a aria-label='Close' className='close' onClick={close}></a>

        <div className='flex align'>
          <div className='modal-img'>
            <img src={main_picture_url} alt='' />
          </div>

          <div className='flex column modal-details'>
            <div className='headings'>
              <h3>{name}</h3>
              <p>
                {gender[0].charAt(0).toUpperCase() +
                  gender[0].slice(1) +
                  "'s Shoes"}
              </p>
              <p>
                {!retail_price_cents
                  ? 'No Price'
                  : '$' + retail_price_cents / 100}
              </p>
            </div>
            <h3>Sizes</h3>
            <div className='size-gallery2'>
              {size_range.map((size) => (
                <span
                  role='button'
                  key={crypto.randomUUID()}
                  style={{
                    fontSize: '0.7em',
                    padding: '0.5em 2.5em',
                    border: 'none',
                    outline: selectedSize === size ? '2px solid black' : 'none',
                  }}
                  onClick={(e) => {
                    if (selectedSize === size) {
                      setSelectedSize(null);
                    } else {
                      setSelectedSize(parseFloat(e.target.innerHTML));
                    }
                  }}>
                  {size}
                </span>
              ))}
            </div>
            <div className=''>
              <button onClick={handleAddToCartClick}>Add to Bag</button>

              <button
                className={favorites.includes(name) ? 'favorite' : 'secondary'}
                onClick={handleFavoriteButtonClick}>
                {favorites.includes(name) ? 'Favorited' : 'Favorite'}
              </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: story_html }}></div>
          </div>
        </div>
      </article>
    </dialog>
  );
}

// id,size,name,retail_price_cents,category,quantity
