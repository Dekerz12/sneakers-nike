import { useEffect, useState } from 'react';

export default function useFilter(sneakers, category) {
  const [value, setValue] = useState(new Set());
  const [selectedValue, setSelectedValue] = useState([]);
  const it = value.values();
  useEffect(() => {
    sneakers?.forEach((sneaker) => {
      if (Array.isArray(sneaker[category])) {
        setValue((prev) => new Set(prev.add(sneaker[category])));
      } else {
        setValue((prev) => new Set(prev.add(sneaker[category]?.toLowerCase())));
      }
    });
  }, [sneakers]);

  const handleClick = (val) => {
    setSelectedValue((prev) => {
      if (prev.includes(val)) {
        return prev.filter((c) => c !== val);
      } else {
        return [...prev, val];
      }
    });
  };

  return [
    typeof it.next().value === 'object'
      ? [...new Set([...value].flat().sort((a, b) => a - b))]
      : [...value],
    selectedValue,
    handleClick,
  ];
}
