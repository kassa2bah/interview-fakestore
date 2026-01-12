// ProductCard Component - Displays individual product in grid
// Shows image, title, price, rating, and add to cart

import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Plus, Sparkles } from 'lucide-react';
import { Product } from '@/api/fakeStoreApi';
import { useAppDispatch } from '@/store';
import { addToCart } from '@/store/cartSlice';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatGMD } from '@/lib/currency';

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
      <article className="card-product bg-card h-full flex flex-col relative overflow-hidden">
        {/* Premium badge for high-rated products */}
        {product.rating.rate >= 4.5 && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
            <Sparkles className="h-3 w-3" />
            Top Rated
          </div>
        )}

        {/* Image */}
        <div className="relative aspect-square p-6 bg-gradient-to-br from-secondary/30 to-secondary/60 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--accent)/0.1),transparent_70%)]" />
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-lg"
            loading="lazy"
          />
          {/* Quick add button */}
          <Button
            variant="secondary"
            size="icon"
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-card/95 backdrop-blur-sm shadow-xl hover:bg-accent hover:text-accent-foreground border border-border/50"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Category badge */}
          <span className="badge-category mb-3 self-start text-[10px] uppercase tracking-wider">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-3 group-hover:text-accent transition-colors leading-snug">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(product.rating.rate)
                      ? 'fill-warning text-warning'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-foreground">
              {product.rating.rate}
            </span>
            <span className="text-xs text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>

          {/* Price & Add to cart */}
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
                {formatGMD(product.price)}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Gambian Dalasi
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              className="text-muted-foreground hover:text-accent hover:border-accent transition-all"
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
