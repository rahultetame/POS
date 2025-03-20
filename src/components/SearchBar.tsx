import React, { useState } from 'react';
import '../styles/SearchBar.scss';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Type to search'
        value={query}
        onChange={handleSearch}
      />
      <>
        <SearchIcon />
      </>
    </div>
  );
};

export default SearchBar;
