import { useState } from "react";
import { useSneakers } from "./SneakerContext";
export default function Modal({ close, prop, onClick }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const {
    main_picture_url,
    story_html,
    name,
    gender,
    retail_price_cents,
    size_range,
  } = prop;
  const { favorites, setFavorites } = useSneakers();
  console.log(favorites);
  return (
    <dialog open onClick={close}>
      <article className="modal-card" onClick={(e) => e.stopPropagation()}>
        <a aria-label="Close" className="close" onClick={close}></a>

        <div className="modal-flex">
          <img src={main_picture_url} alt="" />
          <div className="modal-details">
            <div>
              <h3>{name}</h3>
              <p>
                {gender[0].charAt(0).toUpperCase() +
                  gender[0].slice(1) +
                  "'s Shoes"}
              </p>
              <p>
                {!retail_price_cents
                  ? "No Price"
                  : "$" + retail_price_cents / 100}
              </p>
            </div>
            <h3>Sizes</h3>
            <div className="modal-size-gallery">
              {size_range.map((size) => (
                <span
                  role="button"
                  key={crypto.randomUUID()}
                  style={{
                    fontSize: "0.7em",
                    padding: "0.5em 2.5em",
                    border: "none",
                    outline: selectedSize === size ? "2px solid black" : "none",
                  }}
                  onClick={(e) => {
                    if (selectedSize === size) {
                      setSelectedSize(null);
                    } else {
                      setSelectedSize(parseFloat(e.target.innerHTML));
                    }
                  }}
                >
                  {size}
                </span>
              ))}
            </div>
            <div className="article-details">
              <button>Add to Bag</button>
              <button
                className={favorites.includes(name) ? "favorite" : "secondary"}
                onClick={onClick}
              >
                Favourite
              </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: story_html }}></div>
          </div>
        </div>
      </article>
    </dialog>
  );
}
