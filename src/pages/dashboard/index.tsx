import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import SearchBar from '../../components/SearchBar';
import CategoryFilter from './CategoryFilter';
import ProductCard from '../../components/ProductCard';
import '../../styles/ProductList.scss';
import { RootState } from '../../redux/store';
import { Box, Typography } from '@mui/material';
import Cart from '../cart';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state: RootState) => state.products);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const categories = [
    'All Products',
    ...new Set(products.map((p: any) => p.category)),
  ];
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All Products' ||
      product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Box flex={1} p={0} overflow='auto'>
        <div className='product-list-container'>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant='h6'>Categories</Typography>
            <SearchBar onSearch={handleSearch} />
          </Box>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className='product-grid'>
            {filteredProducts.length > 0 ? (
              filteredProducts?.map((product) => {
                const isInCart = cartItems?.some(
                  (item) => item.sku === product.sku
                );

                return (
                  <ProductCard
                    key={product.sku}
                    product={product}
                    isInCart={isInCart}
                    onAddToCart={() => dispatch(addToCart(product))}
                  />
                );
              })
            ) : (
              <p className='no-products'>No products found.</p>
            )}
          </div>
        </div>
      </Box>
      <Cart />
    </>
  );
};

export default Dashboard;
