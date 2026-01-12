// Walkthrough Page - Technical documentation for interview
// Explains API usage, state management, and architecture decisions

import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Database, ShoppingCart, Users, Key, Lightbulb } from 'lucide-react';
import Header from '@/components/Header';

const Walkthrough = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-main py-8 max-w-4xl">
        {/* Back button */}
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Store</span>
        </Link>

        <article className="prose prose-lg max-w-none animate-fade-in">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Technical Walkthrough
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            A comprehensive overview of the architecture, API integration, and state management decisions made in this e-commerce application.
          </p>

          {/* API Endpoints Section */}
          <section className="mb-12 bg-card p-8 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground m-0">
                Fake Store API Endpoints Used
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  Authentication
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <code className="bg-secondary px-2 py-1 rounded text-sm">POST /auth/login</code>
                    <span className="ml-2">— Authenticates users and returns a JWT token</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  Products
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <code className="bg-secondary px-2 py-1 rounded text-sm">GET /products</code>
                    <span className="ml-2">— Fetches all products for the main listing</span>
                  </li>
                  <li>
                    <code className="bg-secondary px-2 py-1 rounded text-sm">GET /products/:id</code>
                    <span className="ml-2">— Fetches single product for detail view</span>
                  </li>
                  <li>
                    <code className="bg-secondary px-2 py-1 rounded text-sm">GET /products/categories</code>
                    <span className="ml-2">— Fetches category list for filtering</span>
                  </li>
                  <li>
                    <code className="bg-secondary px-2 py-1 rounded text-sm">GET /products/category/:category</code>
                    <span className="ml-2">— Fetches products filtered by category</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  Users & Carts (Additional API Usage)
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <code className="bg-secondary px-2 py-1 rounded text-sm">GET /users/:id</code>
                    <span className="ml-2">— Fetches user profile data after login</span>
                  </li>
                  <li>
                    <code className="bg-secondary px-2 py-1 rounded text-sm">GET /carts/user/:id</code>
                    <span className="ml-2">— Fetches user's order history for profile page</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* State Management Section */}
          <section className="mb-12 bg-card p-8 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground m-0">
                Why Redux Toolkit?
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Redux Toolkit</strong> was chosen for this project for several key reasons:
              </p>
              <ul className="space-y-3">
                <li>
                  <strong className="text-foreground">Reduced Boilerplate:</strong> createSlice automatically generates action creators and action types, significantly reducing code verbosity.
                </li>
                <li>
                  <strong className="text-foreground">Built-in Async Handling:</strong> createAsyncThunk provides a standardized pattern for handling async operations with pending/fulfilled/rejected states.
                </li>
                <li>
                  <strong className="text-foreground">Immutability with Immer:</strong> Write "mutating" logic that's automatically converted to immutable updates.
                </li>
                <li>
                  <strong className="text-foreground">DevTools Integration:</strong> Automatic Redux DevTools setup for debugging state changes.
                </li>
                <li>
                  <strong className="text-foreground">TypeScript Support:</strong> Excellent TypeScript integration with typed hooks (useAppSelector, useAppDispatch).
                </li>
              </ul>
            </div>
          </section>

          {/* Architecture Section */}
          <section className="mb-12 bg-card p-8 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground m-0">
                State Management Architecture
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Authentication State (authSlice)</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Stores JWT token returned from POST /auth/login</li>
                  <li>Manages user profile data fetched via GET /users/:id</li>
                  <li>Tracks loading and error states for auth operations</li>
                  <li>Provides isAuthenticated flag for protected routes</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Cart State (cartSlice)</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Frontend-only cart management (no API persistence)</li>
                  <li>Add/remove products with quantity control</li>
                  <li>Automatic total calculation (items count + price)</li>
                  <li>Cart persists in Redux store during session</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Products State (productsSlice)</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Caches fetched products to minimize API calls</li>
                  <li>Manages category filtering state</li>
                  <li>Handles loading states and error messages</li>
                  <li>Stores current product for detail view</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Improvements Section */}
          <section className="mb-12 bg-card p-8 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground m-0">
                Possible Improvements
              </h2>
            </div>

            <div className="text-muted-foreground">
              <p className="mb-4">
                Given more time, the following enhancements would be implemented:
              </p>
              <ul className="space-y-3">
                <li>
                  <strong className="text-foreground">Pagination:</strong> Implement infinite scroll or traditional pagination for large product lists.
                </li>
                <li>
                  <strong className="text-foreground">Caching with RTK Query:</strong> Replace manual async thunks with RTK Query for automatic caching, deduplication, and background refetching.
                </li>
                <li>
                  <strong className="text-foreground">Memoization:</strong> Use useMemo and React.memo to prevent unnecessary re-renders, especially in product grid.
                </li>
                <li>
                  <strong className="text-foreground">Unit Tests:</strong> Add Jest + React Testing Library tests for Redux slices and components.
                </li>
                <li>
                  <strong className="text-foreground">E2E Tests:</strong> Implement Cypress or Playwright tests for critical user flows.
                </li>
                <li>
                  <strong className="text-foreground">Accessibility:</strong> Add ARIA labels, keyboard navigation, and screen reader support.
                </li>
                <li>
                  <strong className="text-foreground">Performance:</strong> Implement code splitting, lazy loading, and image optimization.
                </li>
                <li>
                  <strong className="text-foreground">Search:</strong> Add product search functionality with debounced input.
                </li>
                <li>
                  <strong className="text-foreground">Wishlist:</strong> Allow users to save products for later.
                </li>
                <li>
                  <strong className="text-foreground">Cart Persistence:</strong> Store cart in localStorage to persist across sessions.
                </li>
              </ul>
            </div>
          </section>

          {/* Project Structure */}
          <section className="mb-12 bg-card p-8 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground m-0">
                Project Structure
              </h2>
            </div>

            <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm">
{`src/
├── api/
│   └── fakeStoreApi.ts    # Centralized API layer
├── components/
│   ├── CartItem.tsx       # Cart item with controls
│   ├── CategoryFilter.tsx # Category filter pills
│   ├── Header.tsx         # Navigation header
│   ├── LoadingSpinner.tsx # Loading indicator
│   ├── ProductCard.tsx    # Product grid card
│   └── ProductSkeleton.tsx # Loading placeholder
├── pages/
│   ├── Cart.tsx           # Shopping cart page
│   ├── Login.tsx          # Authentication page
│   ├── ProductDetails.tsx # Single product view
│   ├── Products.tsx       # Product listing
│   ├── Profile.tsx        # User profile + orders
│   └── Walkthrough.tsx    # This documentation
├── store/
│   ├── authSlice.ts       # Auth state management
│   ├── cartSlice.ts       # Cart state management
│   ├── productsSlice.ts   # Products state
│   └── index.ts           # Store configuration
└── App.tsx                # Route definitions`}
            </pre>
          </section>
        </article>
      </main>
    </div>
  );
};

export default Walkthrough;
