import { useSneakers } from '../Context/SneakerContext';

export default function Colors() {
  const { colors, selectedColors, handleSelectedColor } = useSneakers();

  const colorMap = {
    cream: '#FFFDD0',
    'multi-color':
      'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%)',
  };
  return (
    <div>
      <div className='color-gallery'>
        {colors?.map((color) => (
          <div key={color} className='flex column'>
            <span
              style={{
                background: colorMap[color] ? colorMap[color] : color,
                border: '1px solid black',
                outline: selectedColors.includes(color)
                  ? '2px solid black'
                  : 'none',
              }}
              className='color-button'
              role='button'
              onClick={() => handleSelectedColor(color)}></span>
            <div style={{ textAlign: 'center' }}>{color}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
