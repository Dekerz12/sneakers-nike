import useToggle from './customhooks/useToggle';
import Modal from './Modal';
useToggle;
export default function Sneaker(props) {
  const { gender, name, grid_picture_url, retail_price_cents } = props;
  const [modal, toggleModal] = useToggle(false);
  return (
    <>
      <div onClick={toggleModal}>
        <img src={grid_picture_url} alt='' />
        <div className='headings sneaker-item-details'>
          <div className='headings'>
            <p>{name}</p>
            <p>
              {gender[0].charAt(0).toUpperCase() +
                gender[0].slice(1) +
                "'s Shoes"}
            </p>
          </div>

          <p style={{ marginBottom: 0 }}>
            {!retail_price_cents ? 'No Price' : '$' + retail_price_cents / 100}
          </p>
        </div>
      </div>
      {modal && <Modal props={...props} close={toggleModal} />}
    </>
  );
}
