import { BsFillCartFill } from 'react-icons/bs';
import useToggle from './customhooks/useToggle';
import { ImCross } from 'react-icons/im';
import { useSneakers } from './Context/SneakerContext';

function totalPrice(arr) {
  return arr.reduce(
    (arr, curr) => {
      return parseInt(
        (arr += parseInt((curr.retail_price_cents * curr.quantity) / 100))
      );
    },
    [0]
  );
}

export default function Cart() {
  const [isCartOpen, toggleCart] = useToggle(false);

  return (
    <div
      className='flex align-start fixed'
      style={{ right: isCartOpen ? 0 : '-25em' }}>
      <BsFillCartFill onClick={toggleCart} className='cart-icon' />
      <article style={{ marginTop: 0 }}>
        <CartHeader />
        <CartBody />
        <CartFooter />
      </article>
    </div>
  );
}

function CartHeader() {
  return (
    <header className='flex center'>
      <BsFillCartFill />
      <span>Cart</span>
    </header>
  );
}

function CartBody() {
  return <CartList />;
}

function CartFooter() {
  const { cartItems } = useSneakers();
  return (
    <footer>
      <div className='flex align space-between'>
        <h6>SUBTOTAL</h6>
        <h6>$ {totalPrice(cartItems)}</h6>
      </div>
      <button>CHECKOUT</button>
    </footer>
  );
}

function CartList() {
  const { cartItems } = useSneakers();
  if (!cartItems.length) {
    return (
      <center>
        <h1>No Items Yet :P</h1>
      </center>
    );
  }
  return cartItems.map(
    ({
      id,
      name,
      selectedSize,
      retail_price_cents,
      gender,
      quantity,
      grid_picture_url,
    }) => {
      return (
        <CartItem
          key={id + selectedSize}
          id={id}
          name={name}
          selectedSize={selectedSize}
          retail_price_cents={retail_price_cents}
          gender={gender}
          quantity={quantity}
          cartItems={cartItems}
          grid_picture_url={grid_picture_url}
        />
      );
    }
  );
}

function CartItem({
  id,
  name,
  selectedSize,
  retail_price_cents,
  gender,
  quantity,
  cartItems,
  grid_picture_url,
}) {
  const { setCartItems } = useSneakers();
  const index = cartItems.findIndex(
    (cart) => cart.id == id && cart.selectedSize == selectedSize
  );
  function increaseSneakerCount() {
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
  function decreaseSneakerCount() {
    setCartItems((pre) =>
      pre.map((item) => {
        if (item.selectedSize === cartItems[index].selectedSize) {
          if (item.quantity === 1) {
            setCartItems((pre) => pre.filter((elem) => item.id !== elem.id));
          }
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      })
    );
  }

  function removeSneaker(id) {
    setCartItems((pre) => pre.filter((elem) => id !== elem.id));
  }
  return (
    <div className='flex' style={{ gap: '1em' }}>
      {cartItems.length ? (
        <>
          {' '}
          <div className='cart-item-image'>
            <img src={grid_picture_url} alt={name} />
          </div>
          <div className='flex align cart-item-details '>
            <div className='flex column headings'>
              <p>{name}</p>
              <p>{selectedSize}</p>
              <p>{gender}</p>
              <p>Quantity: {quantity}</p>
            </div>
            <div
              className='flex column flex1'
              style={{
                justifyContent: 'flex-start',
              }}>
              <span className='cart-x-button' onClick={() => removeSneaker(id)}>
                <ImCross />
              </span>
              <p>${retail_price_cents / 100}</p>
              <div className='flex' style={{ gap: '.2em' }}>
                <span
                  role='button'
                  className='cart-button'
                  onClick={decreaseSneakerCount}>
                  -
                </span>
                <span
                  role='button'
                  className='cart-button'
                  onClick={increaseSneakerCount}>
                  +
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No Items Yet</p>
      )}
    </div>
  );
}
