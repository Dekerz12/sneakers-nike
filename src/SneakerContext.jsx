import { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import useToggle from './customhooks/useToggle';
import useFilter from './customhooks/useFilter';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const SneakersContext = createContext();

export function useSneakers() {
  return useContext(SneakersContext);
}

export default function SneakersProvider({ children }) {
  const [isSidebarOpen, toggleIsSidebarOpen] = useToggle(false);
  const [sortedBy, setSortedBy] = useState('a-z');
  const [query, setQuery] = useState('');
  const { data, isInitialLoading } = useQuery(['sneakers'], () => {
    return axios.get(
      'https://raw.githubusercontent.com/Stupidism/goat-sneakers/master/api.json'
    );
  });
  const sneakers = data?.data.sneakers;
  const [colors, selectedColors, handleSelectedColor] = useFilter(
    sneakers,
    'color'
  );

  const [brands, selectedBrands, handleSelectedBrands] = useFilter(
    sneakers,
    'brand_name'
  );
  const [shoeCondition, selectedShoeCondition, handleSelectedShoeCondition] =
    useFilter(sneakers, 'shoe_condition');

  const [size, selectedSize, handleSelectedSize] = useFilter(
    sneakers,
    'size_range'
  );

  const filteredSneakers = sneakers
    ?.filter((sneaker) => {
      const nameOrNicknameMatches =
        sneaker.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        sneaker.nickname.toLowerCase().includes(query.trim().toLowerCase());
      const colorMatches =
        selectedColors.length > 0
          ? selectedColors.includes(sneaker.color.toLowerCase())
          : true;
      const brandMatches =
        selectedBrands.length > 0
          ? selectedBrands.includes(sneaker.brand_name.toLowerCase())
          : true;
      const shoeConditionMatches =
        selectedShoeCondition.length > 0
          ? selectedShoeCondition.includes(sneaker.shoe_condition.toLowerCase())
          : true;
      const sizeMatches =
        selectedSize.length > 0
          ? sneaker.size_range.some((size) => selectedSize.includes(size))
          : true;
      return (
        nameOrNicknameMatches &&
        colorMatches &&
        brandMatches &&
        shoeConditionMatches &&
        sizeMatches
      );
    })
    .sort((a, b) => {
      switch (sortedBy) {
        case 'a-z':
          return a.name < b.name ? -1 : 1;
        case 'z-a':
          return a.name > b.name ? -1 : 1;
        case 'oldest':
          return a.release_date_unix - b.release_date_unix;
        case 'newest':
          return b.release_date_unix - a.release_date_unix;
        case 'low to high':
          return a.retail_price_cents - b.retail_price_cents;
        case 'high to low':
          return b.retail_price_cents - a.retail_price_cents;
      }
    });
  return (
    <SneakersContext.Provider
      value={{
        isSidebarOpen,
        toggleIsSidebarOpen,
        sortedBy,
        setSortedBy,
        sneakers,
        isInitialLoading,
        query,
        setQuery,
        filteredSneakers,
        colors,
        brands,
        shoeCondition,
        selectedColors,
        handleSelectedColor,
        selectedBrands,
        handleSelectedBrands,
        selectedShoeCondition,
        handleSelectedShoeCondition,
        size,
        selectedSize,
        handleSelectedSize,
      }}>
      {children}
    </SneakersContext.Provider>
  );
}

/*
id
brand_name
color
gender
grid_picture_url
name
nickname
release_date
release_year
retail_price_cents
shoe_condition
silhouette
size_range
story_html
*/
