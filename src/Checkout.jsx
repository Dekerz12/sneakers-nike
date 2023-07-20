import { BsFillCartFill } from "react-icons/bs";
import useToggle from "./customhooks/useToggle";
import { ImCross } from "react-icons/im";
import { useSneakers } from "./SneakerContext";

function totalPrice(arr) {
  return arr.reduce(
    (arr, curr) => {
      return parseInt((arr += parseInt(curr.retail_price_cents / 100)));
    },
    [0]
  );
}

export default function Checkout() {
  const [cart, toggleCart] = useToggle(false);
  const { cartItems } = useSneakers();
  console.log(totalPrice(cartItems));
  return (
    <div>
      <hgroup
        className="flex cart-sidebar"
        style={{ width: cart ? (cartItems.length ? "30em" : "18em") : "5%" }}
      >
        <div
          className="cart-icon"
          style={{ right: cart ? 0 : "1em", margin: 0 }}
        >
          <BsFillCartFill onClick={toggleCart} />
        </div>

        <Cart cart={cart} cartItems={cartItems} />
      </hgroup>
    </div>
  );
}

function Cart({ cart, cartItems }) {
  return (
    <div className="cart-card" style={{ right: cart ? "0" : "-32em" }}>
      <div style={{ margin: 0, width: "100%" }}>
        <article style={{ margin: 0, width: "100%" }}>
          <header className="flex cart-details">
            <BsFillCartFill />
            <h1 style={{ margin: 0 }}>Cart</h1>
          </header>
          <CheckoutList cart={cartItems} />
          <footer>
            <div className="flex">
              <h6>SUBTOTAL</h6>
              <h6>$ {totalPrice(cartItems)}</h6>
            </div>
            <button>CHECKOUT</button>
          </footer>
        </article>
      </div>
    </div>
  );
}

function CheckoutList({ cart }) {
  return (
    <div
      className="checkout-list"
      style={{
        overflow: "scroll",
        height: "250px",
        display: "flex",
        gap: "1em",
        flexDirection: "column",
      }}
    >
      {cart?.map((item) => {
        return <CheckoutItem key={crypto.randomUUID()} {...item} />;
      })}
    </div>
  );
}

function CheckoutItem(props) {
  const {
    id,
    name,
    selectedSize,
    retail_price_cents,
    gender,
    quantity,
    grid_picture_url,
  } = props;
  return (
    <div className="flex">
      <img style={{ width: "30%" }} src={grid_picture_url} alt="" />
      <div className="cart-item-details">
        <div className="headings">
          <h6>{name}</h6>
          <h6>{gender}</h6>
          <h6>{selectedSize}</h6>
          <h6>Quantity: {quantity}</h6>
        </div>
        <div className="headings cart-buttons">
          <span>
            <ImCross />
          </span>
          <h6>{"$" + retail_price_cents / 100}</h6>
          <div>+-</div>
        </div>
      </div>
    </div>
  );
}
