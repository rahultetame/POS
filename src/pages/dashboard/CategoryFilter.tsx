import React from 'react';
import '../../styles/CategoryFilter.scss';
import AcUnitIcon from '@mui/icons-material/AcUnit';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className='category-scroll'>
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${
            selectedCategory === category ? 'active' : ''
          }`}
          onClick={() => onSelectCategory(category)}
        >
          <AcUnitIcon fontSize='large' />
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
