import { useState } from 'react';
import { useSneakers } from './Context/SneakerContext';
import toast, { useToaster } from 'react-hot-toast';
import useToggle from './customhooks/useToggle';

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
  const [validation, toggleValidation] = useToggle();
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

  // const successMessage = () => toast.success('🛒 Added to cart Successfully');

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
      toast('🛒 Added to cart Successfully');
    } else {
      toggleValidation();
    }
  }

  return (
    <dialog open onClick={close}>
      <Notifications />
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
                      toggleValidation(false);
                      setSelectedSize(parseFloat(e.target.innerHTML));
                    }
                  }}>
                  {size}
                </span>
              ))}
            </div>
            <div className=''>
              {validation && <span>Please Select a Size First</span>}
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

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;

  return (
    <div
      style={{
        position: 'fixed',
        marginInline: 'auto',
        top: 8,
        left: '40%',
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={startPause}
      onMouseLeave={endPause}>
      {toasts.map((toast) => {
        const offset = calculateOffset(toast, {
          reverseOrder: false,
          gutter: 8,
        });

        const ref = (el) => {
          if (el && typeof toast.height !== 'number') {
            const height = el.getBoundingClientRect().height;
            updateHeight(toast.id, height);
          }
        };
        return (
          <div
            key={toast.id}
            ref={ref}
            style={{
              position: 'absolute',

              width: '14em',
              padding: '.3em',
              borderRadius: '.3em',
              background: 'white',
              transition: 'all 0.5s ease-out',
              opacity: toast.visible ? 1 : 0,
              transform: `translateY(${offset}px)`,
            }}
            {...toast.ariaProps}>
            {toast.message}
          </div>
        );
      })}
    </div>
  );
};
// id,size,name,retail_price_cents,category,quantity
