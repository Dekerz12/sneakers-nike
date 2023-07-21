import { BsFillCartFill } from 'react-icons/bs';
import useToggle from './customhooks/useToggle';
import { ImCross } from 'react-icons/im';
import { useSneakers } from './Context/SneakerContext';

// function totalPrice(arr) {
//   return arr.reduce(
//     (arr, curr) => {
//       return parseInt((arr += parseInt(curr.retail_price_cents / 100)));
//     },
//     [0]
//   );
// }

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
  return (
    <footer>
      <div className='flex align space-between'>
        <h6>SUBTOTAL</h6>
        <h6>$ </h6>
      </div>
      <button>CHECKOUT</button>
    </footer>
  );
}

function CartList() {
  return (
    <div className='scrollable'>
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
  );
}

function CartItem() {
  return (
    <div className='flex' style={{ gap: '1em' }}>
      <div className='cart-item-image'>
        <img
          src='https://image.goat.com/375/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png'
          alt=''
        />
      </div>

      <div className='flex align cart-item-details '>
        <div className='flex column headings'>
          <p>Lorem ipsum dolor sit.</p>
          <p>Lorem, ipsum dolor.</p>
          <p>Lorem, ipsum dolor.</p>
          <p>Lorem, ipsum dolor.</p>
        </div>
        <div
          className='flex column flex1'
          style={{
            justifyContent: 'flex-start',
          }}>
          <span className='cart-x-button'>
            <ImCross />
          </span>
          <p>{'$10.90'}</p>
          <div className='flex' style={{ gap: '.2em' }}>
            <span role='button' className='cart-button'>
              -
            </span>
            <span role='button' className='cart-button'>
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
