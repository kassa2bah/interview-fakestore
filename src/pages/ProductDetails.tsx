// ProductDetails Page - Single product view
// Uses GET /products/:id endpoint

import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchProductById, clearCurrentProduct } from '@/store/productsSlice';
import { addToCart, updateQuantity } from '@/store/cartSlice';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { currentProduct, isLoading, error } = useAppSelector(
    (state) => state.products
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  
  // Check if product is in cart
  const cartItem = cartItems.find(
    (item) => item.product.id === currentProduct?.id
  );

  // Fetch product on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
    
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart(currentProduct));
      toast.success('Added to cart!');
    }
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (currentProduct) {
      dispatch(updateQuantity({ productId: currentProduct.id, quantity: newQuantity }));
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <LoadingSpinner size="lg" text="Loading product..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !currentProduct) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-main py-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Product not found
          </h2>
          <p className="text-muted-foreground mb-8">
            {error || "We couldn't find the product you're looking for."}
          </p>
          <Button onClick={() => navigate('/')} className="btn-primary">
            Back to Products
          </Button>
        </div>
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
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-12 animate-fade-in">
          {/* Image */}
          <div className="bg-card rounded-xl p-8 lg:p-12 border border-border">
            <img
              src={currentProduct.image}
              alt={currentProduct.title}
              className="w-full max-h-[500px] object-contain"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Category */}
            <Link
              to={`/?category=${currentProduct.category}`}
              className="badge-category hover:bg-secondary/80 transition-colors"
            >
              {currentProduct.category}
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
              {currentProduct.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(currentProduct.rating.rate)
                        ? 'fill-warning text-warning'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium text-foreground">
                {currentProduct.rating.rate}
              </span>
              <span className="text-muted-foreground">
                ({currentProduct.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="pt-4 border-t border-border">
              <span className="text-4xl font-bold text-foreground">
                ${currentProduct.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="pt-6 space-y-4">
              {cartItem ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-lg font-semibold">
                      {cartItem.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">In cart</span>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  className="btn-accent w-full sm:w-auto h-14 px-8 text-lg gap-3"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              )}

              <Link to="/cart">
                <Button variant="outline" className="w-full sm:w-auto h-12">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
