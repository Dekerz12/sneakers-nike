import { BsFillCartFill, BsXSquareFill } from 'react-icons/bs';
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
  const { cartItems } = useSneakers();

  return (
    <div
      className='flex align-start fixed'
      style={{ right: isCartOpen ? 0 : '-25em' }}>
      {isCartOpen ? (
        <BsXSquareFill onClick={toggleCart} className='cart-icon2' />
      ) : (
        <>
          <BsFillCartFill onClick={toggleCart} className='cart-icon' />
          <span onClick={toggleCart} className='cart-count'>
            {cartItems.length}
          </span>
        </>
      )}
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
  return (
    <div className='scrollable'>
      {cartItems.map(
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
      )}
    </div>
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
        if (
          item.selectedSize === cartItems[index].selectedSize &&
          item.name === cartItems[index].name
        ) {
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
        if (
          item.selectedSize === cartItems[index].selectedSize &&
          item.name === cartItems[index].name
        ) {
          if (item.quantity === 1) {
            setCartItems((pre) =>
              pre.filter(
                (elem) =>
                  item.name !== elem.name ||
                  item.selectedSize !== elem.selectedSize
              )
            );
          }
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      })
    );
  }

  function removeSneaker(name, selectedSize) {
    setCartItems((pre) =>
      pre.filter(
        (elem) => selectedSize !== elem.selectedSize || name !== elem.name
      )
    );
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
              <p>Size: {selectedSize}</p>
              <p>{gender}'s shoe</p>
              <p>Quantity: {quantity}</p>
            </div>
            <div
              className='flex column flex1'
              style={{
                height: '100%',
                justifyContent: 'space-between',
              }}>
              <span
                className='cart-x-button'
                onClick={() => removeSneaker(name, selectedSize)}>
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
