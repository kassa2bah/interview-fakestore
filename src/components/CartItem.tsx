// CartItem Component - Single item in cart
// Shows product details with quantity controls

import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/store/cartSlice';
import { useAppDispatch } from '@/store';
import { updateQuantity, removeFromCart } from '@/store/cartSlice';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatGMD } from '@/lib/currency';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  const handleIncrement = () => {
    dispatch(updateQuantity({ productId: product.id, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    dispatch(updateQuantity({ productId: product.id, quantity: quantity - 1 }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border border-border animate-fade-in">
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="shrink-0">
        <div className="w-24 h-24 bg-secondary/50 rounded-md p-2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-foreground text-sm line-clamp-2 hover:text-accent transition-colors">
            {product.title}
          </h3>
        </Link>
        <span className="badge-category mt-1 inline-block">
          {product.category}
        </span>
        <p className="text-lg font-semibold text-foreground mt-2">
          {formatGMD(product.price)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end justify-between">
        {/* Remove button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          className="text-muted-foreground hover:text-destructive h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        {/* Quantity */}
        <div className="flex items-center gap-2 bg-secondary rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecrement}
            className="h-8 w-8 hover:bg-secondary/80"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center font-medium text-foreground">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleIncrement}
            className="h-8 w-8 hover:bg-secondary/80"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        {/* Line total */}
        <span className="text-sm font-semibold text-accent">
          {formatGMD(product.price * quantity)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
