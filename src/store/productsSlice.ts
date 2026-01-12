// Products Slice - Manages products and categories state
// Handles fetching, filtering, and loading states

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { productsApi, Product } from '@/api/fakeStoreApi';

interface ProductsState {
  products: Product[];
  categories: string[];
  selectedCategory: string | null;
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  selectedCategory: null,
  currentProduct: null,
  isLoading: false,
  error: null,
};

/**
 * Fetch all products
 * Uses GET /products endpoint
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productsApi.getAll();
      return products;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

/**
 * Fetch all categories
 * Uses GET /products/categories endpoint
 */
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await productsApi.getCategories();
      return categories;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch categories');
    }
  }
);

/**
 * Fetch products by category
 * Uses GET /products/category/:category endpoint
 */
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const products = await productsApi.getByCategory(category);
      return { products, category };
    } catch (error: any) {
      return rejectWithValue('Failed to fetch products by category');
    }
  }
);

/**
 * Fetch single product by ID
 * Uses GET /products/:id endpoint
 */
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      const product = await productsApi.getById(id);
      return product;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch product');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.selectedCategory = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // Fetch by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.selectedCategory = action.payload.category;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCategory, clearCurrentProduct, clearError } =
  productsSlice.actions;
export default productsSlice.reducer;
