// ProductCard Component - Displays individual product in grid
// Shows image, title, price, rating, and add to cart

import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import { Product } from '@/api/fakeStoreApi';
import { useAppDispatch } from '@/store';
import { addToCart } from '@/store/cartSlice';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success('Added to cart', {
      description: product.title.substring(0, 30) + '...',
    });
  };

  return (
    <Link to={`/products/${product.id}`} className="block group">
      <article className="card-product bg-card h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-square p-6 bg-secondary/50 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Quick add button */}
          <Button
            variant="secondary"
            size="icon"
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-card shadow-lg hover:bg-accent hover:text-accent-foreground"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Category badge */}
          <span className="badge-category mb-2 self-start">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-2 group-hover:text-accent transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium text-foreground">
              {product.rating.rate}
            </span>
            <span className="text-xs text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>

          {/* Price & Add to cart */}
          <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddToCart}
              className="text-muted-foreground hover:text-accent"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
