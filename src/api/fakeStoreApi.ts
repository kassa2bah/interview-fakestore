// API Layer for Fake Store API
// Centralized API functions for clean separation of concerns

import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Types
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: Array<{
    productId: number;
    quantity: number;
  }>;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// Authentication API
export const authApi = {
  /**
   * POST /auth/login
   * Authenticates user and returns JWT token
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
};

// Products API
export const productsApi = {
  /**
   * GET /products
   * Fetches all products
   */
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },

  /**
   * GET /products/:id
   * Fetches single product by ID
   */
  getById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  /**
   * GET /products/categories
   * Fetches all product categories
   */
  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/products/categories');
    return response.data;
  },

  /**
   * GET /products/category/:category
   * Fetches products by category
   */
  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/category/${category}`);
    return response.data;
  },
};

// Users API
export const usersApi = {
  /**
   * GET /users
   * Fetches all users
   */
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  /**
   * GET /users/:id
   * Fetches single user by ID
   */
  getById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
};

// Carts API
export const cartsApi = {
  /**
   * GET /carts
   * Fetches all carts
   */
  getAll: async (): Promise<Cart[]> => {
    const response = await api.get<Cart[]>('/carts');
    return response.data;
  },

  /**
   * GET /carts/user/:id
   * Fetches carts by user ID
   */
  getByUserId: async (userId: number): Promise<Cart[]> => {
    const response = await api.get<Cart[]>(`/carts/user/${userId}`);
    return response.data;
  },
};
