import { BsHeartFill } from 'react-icons/bs';
export default function Sneaker(props) {
  const { gender, name, grid_picture_url, retail_price_cents } = props;
  // const [modal, toggleModal] = useToggle(false);
  // const { favorites, setFavorites, isSidebarOpen, toggleIsSidebarOpen } =
  // useSneakers();
  // function handleFavoriteButtonClick(e) {
  //   e.stopPropagation();
  //   if (favorites.includes(name)) {
  //     setFavorites((prev) =>
  //       prev.filter((favSneakerName) => favSneakerName !== name)
  //     );
  //   } else {
  //     setFavorites((prev) => [...prev, name]);
  //   }
  // }

  return (
    <>
      <div className='flex column card'>
        <img src={grid_picture_url} alt='' />
        <div className='flex column space-between' style={{ height: '100%' }}>
          <div className='headings'>
            <p>{name}</p>
            <p>
              {gender[0].charAt(0).toUpperCase() +
                gender[0].slice(1) +
                "'s Shoes"}
            </p>
          </div>

          <p style={{ margin: 0 }}>
            {!retail_price_cents ? 'No Price' : '$' + retail_price_cents / 100}
          </p>
        </div>
      </div>
    </>
  );
}
