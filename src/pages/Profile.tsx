// Profile Page - User profile and order history
// Uses GET /users/:id and GET /carts/user/:id endpoints

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Mail, Package, Calendar, LogOut } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { logout } from '@/store/authSlice';
import { cartsApi, Cart, productsApi, Product } from '@/api/fakeStoreApi';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [carts, setCarts] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [isLoadingCarts, setIsLoadingCarts] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch user carts and products
  useEffect(() => {
    const fetchCartsAndProducts = async () => {
      if (!user) return;
      
      try {
        setIsLoadingCarts(true);
        // Fetch carts for user (using ID 1 as demo)
        const userCarts = await cartsApi.getByUserId(1);
        setCarts(userCarts);

        // Fetch all products to map product IDs to names
        const allProducts = await productsApi.getAll();
        const productMap: Record<number, Product> = {};
        allProducts.forEach((p) => {
          productMap[p.id] = p;
        });
        setProducts(productMap);
      } catch (error) {
        console.error('Failed to fetch carts:', error);
      } finally {
        setIsLoadingCarts(false);
      }
    };

    fetchCartsAndProducts();
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <LoadingSpinner size="lg" text="Loading profile..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-main py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-xl border border-border animate-fade-in">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-accent" />
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground capitalize">
                  {user.name.firstname} {user.name.lastname}
                </h1>
                <span className="text-muted-foreground">@{user.username}</span>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{user.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-foreground">
                    {user.address.number} {user.address.street}
                    <br />
                    {user.address.city}, {user.address.zipcode}
                  </span>
                </div>
              </div>

              {/* Logout */}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <div className="animate-slide-up">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Order History
              </h2>

              {isLoadingCarts ? (
                <div className="flex items-center justify-center py-12">
                  <LoadingSpinner size="md" text="Loading orders..." />
                </div>
              ) : carts.length === 0 ? (
                <div className="bg-card p-8 rounded-xl border border-border text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No orders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {carts.map((cart) => (
                    <div
                      key={cart.id}
                      className="bg-card p-6 rounded-xl border border-border"
                    >
                      {/* Order Header */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Order #{cart.id}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">
                              {new Date(cart.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                        <span className="badge-category bg-success/10 text-success">
                          Delivered
                        </span>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3">
                        {cart.products.map((item) => {
                          const product = products[item.productId];
                          return (
                            <div
                              key={item.productId}
                              className="flex items-center gap-4"
                            >
                              {product && (
                                <>
                                  <div className="w-12 h-12 bg-secondary/50 rounded-md p-1 shrink-0">
                                    <img
                                      src={product.image}
                                      alt={product.title}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                      {product.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      Qty: {item.quantity} × ${product.price.toFixed(2)}
                                    </p>
                                  </div>
                                  <span className="text-sm font-semibold text-foreground">
                                    ${(product.price * item.quantity).toFixed(2)}
                                  </span>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Order Total */}
                      <div className="mt-4 pt-4 border-t border-border flex justify-between">
                        <span className="font-medium text-foreground">Total</span>
                        <span className="font-bold text-foreground">
                          $
                          {cart.products
                            .reduce((sum, item) => {
                              const product = products[item.productId];
                              return sum + (product ? product.price * item.quantity : 0);
                            }, 0)
                            .toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
