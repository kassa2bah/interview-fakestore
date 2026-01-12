// CategoryFilter Component - Filter products by category
// Displays category pills for quick filtering

import { useAppSelector, useAppDispatch } from '@/store';
import { fetchProducts, fetchProductsByCategory } from '@/store/productsSlice';

const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory, isLoading } = useAppSelector(
    (state) => state.products
  );

  const handleCategoryClick = (category: string | null) => {
    if (category === null) {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(category));
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* All products button */}
      <button
        onClick={() => handleCategoryClick(null)}
        disabled={isLoading}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          selectedCategory === null
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        All Products
      </button>

      {/* Category buttons */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          disabled={isLoading}
          className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
