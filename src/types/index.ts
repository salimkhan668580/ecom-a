// Product Types
export type ApiProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string[];
  category: string;
  avgRating: number;
  ratingCount?: number;
  ratings?: any[];
  createdAt: string;
  updatedAt: string;
  canRate?: boolean;
  alreadyRated?: boolean;
  InWishlist?: boolean;
  quantity?: number;
  itemPrice?: number;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  discount?: number;
  rating: number;
  image: string;
  category: string;
  stock: number;
};

export type ApiProductDetails = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string[];
  category: string;
  avgRating: number;
  ratingCount?: number;
  ratings: any[];
  createdAt: string;
  updatedAt: string;
  canRate?: boolean;
  alreadyRated?: boolean;
  InWishlist?: boolean;
};

export type ProductDetailsData = {
  id: string;
  title: string;
  price: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  brand: string;
  packOf: string;
  quantity: string;
  type: string;
  otherDetails: { label: string; value: string }[];
  inStock: boolean;
  stockCount: number;
};

export type ProductListParams = {
  page?: number;
  limit?: number;
  search?: string;
  price_order?: string;
  brand?: string;
  rating?: string;
  category?: string;
};

export type ProductListResponse = {
  success: boolean;
  message: string;
  data: ApiProduct[];
  pagination?: {
    totalDocuments: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type ProductDetailsResponse = {
  success: boolean;
  message: string;
  product: ApiProductDetails;
};

// Wishlist Types
export type ApiWishlistItem = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userDetails: any;
  productDetails: ApiProduct[];
};

export type WishlistResponse = {
  success: boolean;
  message: string;
  data: ApiWishlistItem[];
};

export type AddToWishlistPayload = {
  items: Array<{
    productId: string;
  }>;
};

export type DeleteFromWishlistPayload = {
  items: Array<{
    productId: string;
  }>;
};

// Cart Types
export type ApiCartAggregation = {
  _id: string;
  userId: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  appliedCoupon?: string;
  payableAmount: number;
  productDetails: ApiProduct[];
};

export type CartResponse = {
  success: boolean;
  message: string;
  cartAggregation: ApiCartAggregation[];
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type AddToCartPayload = {
  items: Array<{
    productId: string;
    qty: number;
  }>;
};

export type UpdateCartQuantityPayload = {
  productId: string;
  qty: number;
};

// Address Types
export type ApiAddress = {
  _id: string;
  fullAddress: string;
  city: string;
  state: string;
  pin: number;
};

export type Address = {
  id: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  name?: string;
  phone?: string;
  isDefault?: boolean;
};

export type AddressResponse = {
  success: boolean;
  address: {
    _id: string;
    userId: string;
    allAddress: ApiAddress[];
    __v: number;
  };
};

export type AddAddressPayload = {
  allAddress: Array<{
    fullAddress: string;
    city: string;
    state: string;
    pin: number;
  }>;
};

export type UpdateAddressPayload = {
  fullAddress: string;
  city: string;
  state: string;
  pin: number;
};

// Common Response Types
export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};
