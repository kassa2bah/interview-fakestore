// Cart Page - Frontend-only cart management
// Displays cart items with quantity controls and total

import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { clearCart } from '@/store/cartSlice';
import Header from '@/components/Header';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to checkout');
      navigate('/login');
      return;
    }
    toast.success('Checkout successful! (Demo)');
    dispatch(clearCart());
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-main py-16">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-secondary rounded-full mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link to="/">
              <Button className="btn-accent h-12 px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-main py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Continue Shopping</span>
        </button>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground mt-1">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={handleClearCart}
            className="text-muted-foreground hover:text-destructive gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </Button>
        </div>

        {/* Cart Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-xl border border-border sticky top-24 animate-slide-up">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-success">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium text-foreground">
                    ${(totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-foreground">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-foreground">
                    ${(totalPrice * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="btn-accent w-full h-14 text-lg"
              >
                Checkout
              </Button>

              {!isAuthenticated && (
                <p className="text-xs text-muted-foreground text-center mt-4">
                  You'll need to{' '}
                  <Link to="/login" className="text-accent hover:underline">
                    sign in
                  </Link>{' '}
                  to complete checkout
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
