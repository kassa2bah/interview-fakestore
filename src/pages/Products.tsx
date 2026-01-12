// Products Page - Main product listing with category filtering
// Uses GET /products, GET /products/categories, GET /products/category/:category

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchProducts, fetchCategories } from '@/store/productsSlice';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import ProductSkeleton from '@/components/ProductSkeleton';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error, selectedCategory } = useAppSelector(
    (state) => state.products
  );

  // Fetch products and categories on mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-main py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            {selectedCategory ? (
              <span className="capitalize">{selectedCategory}</span>
            ) : (
              'All Products'
            )}
          </h1>
          <p className="text-muted-foreground">
            {isLoading
              ? 'Loading products...'
              : `${products.length} products available`}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 animate-slide-up">
          <CategoryFilter />
        </div>

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="flex items-center gap-2 text-destructive mb-4">
              <AlertCircle className="h-6 w-6" />
              <span className="text-lg font-medium">{error}</span>
            </div>
            <Button onClick={handleRetry} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
