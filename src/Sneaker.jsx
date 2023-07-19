import useToggle from "./customhooks/useToggle";
import { useSneakers } from "./SneakerContext";
import Modal from "./Modal";
import { BsHeartFill } from "react-icons/bs";
export default function Sneaker(props) {
  const { gender, name, grid_picture_url, retail_price_cents } = props;
  const [modal, toggleModal] = useToggle(false);
  const { favorites, setFavorites, isSidebarOpen, toggleIsSidebarOpen } =
    useSneakers();
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

  return (
    <>
      <div className="card" onClick={toggleModal}>
        <img src={grid_picture_url} alt="" />
        <div className="headings sneaker-item-details">
          <div className="headings">
            <p>{name}</p>
            <p>
              {gender[0].charAt(0).toUpperCase() +
                gender[0].slice(1) +
                "'s Shoes"}
            </p>
          </div>

          <p style={{ marginBottom: 0 }}>
            {!retail_price_cents ? "No Price" : "$" + retail_price_cents / 100}
          </p>
          <BsHeartFill
            className={`heart-icon ${favorites.includes(name) ? "fav" : ""}`}
            style={{
              right: isSidebarOpen ? "3.5em" : "2.5em",
              bottom: isSidebarOpen ? "1em" : ".5em",
              fontSize: isSidebarOpen ? "1em" : "1.2em",
            }}
            onClick={handleFavoriteButtonClick}
          />
        </div>
      </div>
      {modal && (
        <Modal
          prop={props}
          close={toggleModal}
          onClick={handleFavoriteButtonClick}
        />
      )}
    </>
  );
}
