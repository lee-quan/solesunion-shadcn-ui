/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** A brand */
export type Brand = {
  __typename?: 'Brand';
  /** The description of the brand */
  brand_description?: Maybe<Scalars['String']['output']>;
  /** The name of the brand */
  brand_name?: Maybe<Scalars['String']['output']>;
  /** The display order of the brand */
  display_order?: Maybe<Scalars['Int']['output']>;
  /** The id of the section */
  id: Scalars['Int']['output'];
  /** The products of the brand */
  products?: Maybe<Array<Maybe<Product>>>;
  /** The slug of the brand */
  slug?: Maybe<Scalars['String']['output']>;
};

export type BrandAndSize = {
  __typename?: 'BrandAndSize';
  brands?: Maybe<Scalars['String']['output']>;
  sizes?: Maybe<Scalars['String']['output']>;
};

export type BrowseProduct = {
  __typename?: 'BrowseProduct';
  current_page?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Product>>>;
  from?: Maybe<Scalars['Int']['output']>;
  has_more_pages?: Maybe<Scalars['Boolean']['output']>;
  last_page?: Maybe<Scalars['Int']['output']>;
  per_page?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

/** A cart */
export type Cart = {
  __typename?: 'Cart';
  /** The id of the section */
  id: Scalars['Int']['output'];
  /** The description of the brand */
  order_id?: Maybe<Scalars['Int']['output']>;
  /** The slug of the brand */
  status?: Maybe<Scalars['Int']['output']>;
  /** The name of the brand */
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** A cart detail */
export type CartDetail = {
  __typename?: 'CartDetail';
  /** The name of the brand */
  cart_id?: Maybe<Scalars['Int']['output']>;
  /** The id of the section */
  id?: Maybe<Scalars['Int']['output']>;
  /** The offer of the item */
  offer?: Maybe<ProductOffer>;
  /** The slug of the brand */
  offer_id?: Maybe<Scalars['Int']['output']>;
  /** The description of the brand */
  quantity?: Maybe<Scalars['Int']['output']>;
  /** The description of the brand */
  status?: Maybe<Scalars['Int']['output']>;
};

/** A Cart Item Input Type */
export type CartItemInput = {
  /** The ID of the offer */
  offer_id?: InputMaybe<Scalars['Int']['input']>;
  /** Quantity of the offer */
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

/** A category */
export type Category = {
  __typename?: 'Category';
  /** The description of the category */
  cat_description?: Maybe<Scalars['String']['output']>;
  /** The name of the category */
  cat_name?: Maybe<Scalars['String']['output']>;
  /** The display order of the category */
  display_order?: Maybe<Scalars['Int']['output']>;
  /** The id of the section */
  id: Scalars['Int']['output'];
  /** The parent id of the category */
  parent_id?: Maybe<Scalars['Int']['output']>;
  /** The slug of the category */
  slug?: Maybe<Scalars['String']['output']>;
};

export type CreateOrderResponse = {
  __typename?: 'CreateOrderResponse';
  /** The message of the order creation */
  message?: Maybe<Scalars['String']['output']>;
  /** The success of the order creation */
  success: Scalars['Boolean']['output'];
  /** The url of the checkout page */
  url?: Maybe<Scalars['String']['output']>;
};

/** Response of the generic mutation */
export type GenericResponse = {
  __typename?: 'GenericResponse';
  /** Message in case of error */
  message?: Maybe<Scalars['String']['output']>;
  /** Indicates if the login was successful */
  success: Scalars['Boolean']['output'];
};

export type HomePageApparel = {
  __typename?: 'HomePageApparel';
  /** A list of best selling */
  best_seller_female?: Maybe<Array<Maybe<Product>>>;
  /** A list of best selling */
  best_seller_male?: Maybe<Array<Maybe<Product>>>;
  /** A list of products */
  brands?: Maybe<Array<Maybe<Brand>>>;
  /** A list of recommended products */
  recommended?: Maybe<Array<Maybe<Product>>>;
};

export type HomePageSneaker = {
  __typename?: 'HomePageSneaker';
  /** A list of best selling */
  best_seller_female?: Maybe<Array<Maybe<Product>>>;
  /** A list of best selling */
  best_seller_male?: Maybe<Array<Maybe<Product>>>;
  /** A list of products */
  products?: Maybe<Array<Maybe<Section>>>;
  /** A list of recommended products */
  recommended?: Maybe<Array<Maybe<Product>>>;
};

export type HomePageType = {
  __typename?: 'HomePageType';
  apparels?: Maybe<HomePageApparel>;
  sneakers?: Maybe<HomePageSneaker>;
};

/** Response of the login mutation */
export type LoginResponse = {
  __typename?: 'LoginResponse';
  /** JWT Auth Token */
  access_token?: Maybe<Scalars['String']['output']>;
  /** Message in case of error */
  message?: Maybe<Scalars['String']['output']>;
  /** Indicates if the login was successful */
  success: Scalars['Boolean']['output'];
  /** User details */
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateOrder?: Maybe<CreateOrderResponse>;
  LoginMutation?: Maybe<LoginResponse>;
  OnboardSeller?: Maybe<UrlResponse>;
  SellerDashboard_AdminCreateProduct?: Maybe<GenericResponse>;
  SellerDashboard_PublishPendingProductOffer?: Maybe<SellerDashboard_PublishPendingOffer>;
  SellerDashboard_UpdateProductInformation?: Maybe<SellerDashboard_UpdateProductInformation>;
  SellerDashboard_UpdateStock?: Maybe<GenericResponse>;
  UpdateProductOffer?: Maybe<GenericResponse>;
  applyPromoCode?: Maybe<PromoCode>;
  createProductOffer?: Maybe<GenericResponse>;
  forgotPassword?: Maybe<GenericResponse>;
  register?: Maybe<GenericResponse>;
  resetPassword?: Maybe<GenericResponse>;
  updateUserAddress?: Maybe<GenericResponse>;
  updateUserPassword?: Maybe<GenericResponse>;
  updateUserProfile?: Maybe<GenericResponse>;
};


export type MutationCreateOrderArgs = {
  address: Scalars['String']['input'];
  cart: Scalars['String']['input'];
  discount_value?: InputMaybe<Scalars['Float']['input']>;
  email_address?: InputMaybe<Scalars['String']['input']>;
  fulfillment_method: Scalars['String']['input'];
  payment_method_id: Scalars['String']['input'];
  processing_fee_percentage: Scalars['Float']['input'];
  promo_code_id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationLoginMutationArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSellerDashboard_AdminCreateProductArgs = {
  brand_id?: InputMaybe<Scalars['Int']['input']>;
  category_id?: InputMaybe<Scalars['Int']['input']>;
  consignment?: InputMaybe<Scalars['Int']['input']>;
  featured?: InputMaybe<Scalars['Int']['input']>;
  images?: InputMaybe<Scalars['String']['input']>;
  lowest_offer?: InputMaybe<Scalars['Int']['input']>;
  new_brand?: InputMaybe<Scalars['String']['input']>;
  new_category?: InputMaybe<Scalars['String']['input']>;
  product_description?: InputMaybe<Scalars['String']['input']>;
  product_sku?: InputMaybe<Scalars['String']['input']>;
  product_title?: InputMaybe<Scalars['String']['input']>;
  sizes?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationSellerDashboard_PublishPendingProductOfferArgs = {
  offer_ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type MutationSellerDashboard_UpdateProductInformationArgs = {
  brand_id?: InputMaybe<Scalars['Int']['input']>;
  category_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  lowest_offer?: InputMaybe<Scalars['Float']['input']>;
  new_brand?: InputMaybe<Scalars['String']['input']>;
  new_category?: InputMaybe<Scalars['String']['input']>;
  product_description?: InputMaybe<Scalars['String']['input']>;
  product_sku?: InputMaybe<Scalars['String']['input']>;
  product_title?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSellerDashboard_UpdateStockArgs = {
  array?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProductOfferArgs = {
  offer_id?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationApplyPromoCodeArgs = {
  promo_code: Scalars['String']['input'];
};


export type MutationCreateProductOfferArgs = {
  list_type?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  product_size_id?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
};


export type MutationForgotPasswordArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRegisterArgs = {
  birthdate?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  referral_code?: InputMaybe<Scalars['String']['input']>;
};


export type MutationResetPasswordArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserAddressArgs = {
  address_1?: InputMaybe<Scalars['String']['input']>;
  address_2?: InputMaybe<Scalars['String']['input']>;
  address_type?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pincode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserPasswordArgs = {
  current_password?: InputMaybe<Scalars['String']['input']>;
  new_password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserProfileArgs = {
  birthdate?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  vacation_mode?: InputMaybe<Scalars['Int']['input']>;
};

/** A order */
export type Order = {
  __typename?: 'Order';
  /** The address of the order */
  address?: Maybe<Scalars['String']['output']>;
  /** The date the order was created */
  created_at?: Maybe<Scalars['String']['output']>;
  /** The id of the section */
  id: Scalars['Int']['output'];
  /** The details of the order */
  order_details?: Maybe<Array<Maybe<OrderDetail>>>;
  /** The order reference of the order */
  order_ref?: Maybe<Scalars['String']['output']>;
  /** The total amount of the order */
  order_total?: Maybe<Scalars['Float']['output']>;
  /** The user id of the order */
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** A order detail */
export type OrderDetail = {
  __typename?: 'OrderDetail';
  /** The date the order was created */
  created_at?: Maybe<Scalars['String']['output']>;
  /** The id of the section */
  id: Scalars['Int']['output'];
  /** The offer of the item */
  offer?: Maybe<ProductOffer>;
  /** The total amount of the order */
  offer_id?: Maybe<Scalars['Int']['output']>;
  /** The order reference of the order */
  order_id?: Maybe<Scalars['Int']['output']>;
  /** The total price of the item excluding processing fee */
  price?: Maybe<Scalars['Float']['output']>;
  /** The product of the item */
  product?: Maybe<Product>;
  /** The user id of the order */
  product_id?: Maybe<Scalars['Int']['output']>;
  /** The product offer of the item */
  product_offer?: Maybe<ProductOffer>;
  /** The quantity of the item */
  quantity?: Maybe<Scalars['Int']['output']>;
  /** The size of the item */
  size?: Maybe<Scalars['String']['output']>;
  /** The total price of the item including processing fee */
  total_price?: Maybe<Scalars['Float']['output']>;
  /** The unit price of the item */
  unit_price?: Maybe<Scalars['Float']['output']>;
};

export type OrderPagination = {
  __typename?: 'OrderPagination';
  /** Current page of the cursor */
  current_page: Scalars['Int']['output'];
  /** List of items on the current page */
  data: Array<Order>;
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']['output']>;
  /** Determines if cursor has more pages after the current page */
  has_more_pages: Scalars['Boolean']['output'];
  /** The last page (number of pages) */
  last_page: Scalars['Int']['output'];
  /** Number of items returned per page */
  per_page: Scalars['Int']['output'];
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']['output']>;
  /** Number of total items selected by the query */
  total: Scalars['Int']['output'];
};

/** A Order Summary */
export type OrderSummary = {
  __typename?: 'OrderSummary';
  /** The details of the order */
  cart_details?: Maybe<Array<Maybe<CartDetail>>>;
  /** The id of the section */
  total_exclude_processing_fee?: Maybe<Scalars['Float']['output']>;
};

/** A product */
export type Product = {
  __typename?: 'Product';
  /** The brand of the product */
  brand?: Maybe<Brand>;
  /** The brand id of the product */
  brand_id?: Maybe<Scalars['Int']['output']>;
  /** The category of the product */
  category?: Maybe<Category>;
  /** The category id of the product */
  category_id?: Maybe<Scalars['Int']['output']>;
  /** The consignment status of the product */
  consignment?: Maybe<Scalars['Int']['output']>;
  /** The featured status of the product */
  featured?: Maybe<Scalars['Int']['output']>;
  /** The highest offer of the product */
  highest_offer?: Maybe<Scalars['Float']['output']>;
  /** The id of the product */
  id: Scalars['Int']['output'];
  /** The image of the product */
  image?: Maybe<ProductImage>;
  /** The image file of the product */
  image_file?: Maybe<Scalars['String']['output']>;
  /** The images of the product */
  images?: Maybe<Array<Maybe<ProductImage>>>;
  /** The last sale of the product */
  last_sale?: Maybe<OrderDetail>;
  /** The lowest active offer of the product */
  lowest_active_offer?: Maybe<ProductOffer>;
  /** The lowest offer of the product */
  lowest_offer?: Maybe<Scalars['Float']['output']>;
  /** The product */
  product?: Maybe<Product>;
  /** The description of the product */
  product_description?: Maybe<Scalars['String']['output']>;
  /** The product sizes of the product */
  product_sizes?: Maybe<Array<Maybe<ProductSize>>>;
  /** The sku of the product */
  product_sku?: Maybe<Scalars['String']['output']>;
  /** The title of the product */
  product_title?: Maybe<Scalars['String']['output']>;
  /** The stock of the product */
  seller_dashboard_product_sizes?: Maybe<Array<Maybe<ProductSize>>>;
  /** The sizes of the product */
  sizes?: Maybe<Array<Maybe<ProductSize>>>;
  /** The slug of the product */
  slug?: Maybe<Scalars['String']['output']>;
  /** The status of the product */
  status?: Maybe<Scalars['Int']['output']>;
  /** The stripe product id of the product */
  stripe_product_id?: Maybe<Scalars['String']['output']>;
  /** The total quantity sold of the product */
  total_quantity_sold?: Maybe<Scalars['Int']['output']>;
};

/** A product image */
export type ProductImage = {
  __typename?: 'ProductImage';
  /** The id of the section */
  id: Scalars['Int']['output'];
  /** The file of the product image */
  image_file?: Maybe<Scalars['String']['output']>;
  /** The title of the product image */
  image_title?: Maybe<Scalars['String']['output']>;
  /** The product id of the product image */
  product_id?: Maybe<Scalars['Int']['output']>;
};

/** A product offer */
export type ProductOffer = {
  __typename?: 'ProductOffer';
  /** The created at of the product offer */
  created_at?: Maybe<Scalars['String']['output']>;
  /** The deleted status of the product offer */
  deleted?: Maybe<Scalars['Int']['output']>;
  /** The id of the product offer */
  id: Scalars['Int']['output'];
  /** The in store status of the product offer */
  in_store?: Maybe<Scalars['Int']['output']>;
  /** The active status of the product offer */
  is_active?: Maybe<Scalars['Int']['output']>;
  /** The price of the product offer */
  offer_price?: Maybe<Scalars['Float']['output']>;
  /** The sku of the product offer */
  offer_sku?: Maybe<Scalars['String']['output']>;
  /** The processing fee of the product offer */
  processing_fee?: Maybe<Scalars['Float']['output']>;
  /** The size of the product offer */
  prod_size?: Maybe<Scalars['String']['output']>;
  /** The product of the offer */
  product?: Maybe<Product>;
  /** The product id of the product offer */
  product_id?: Maybe<Scalars['Int']['output']>;
  /** The status id of the product offer */
  product_offer_status_id?: Maybe<Scalars['Int']['output']>;
  /** The product size id of the product offer */
  product_size_id?: Maybe<Scalars['Int']['output']>;
  /** The ready stock of the product offer */
  ready_stock?: Maybe<Scalars['Int']['output']>;
  /** The selling fee of the product offer */
  selling_fee?: Maybe<Scalars['Float']['output']>;
  /** The stripe offer id of the product offer */
  stripe_offer_id?: Maybe<Scalars['String']['output']>;
  /** The user id of the product offer */
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** A product size */
export type ProductSize = {
  __typename?: 'ProductSize';
  /** The id of the section */
  id: Scalars['Int']['output'];
  /** The offer of the product size */
  in_store_offer?: Maybe<ProductOffer>;
  /** The offer of the product size */
  offer?: Maybe<ProductOffer>;
  /** The offer of the product size */
  online_offer?: Maybe<ProductOffer>;
  /** The product id of the product size */
  product_id?: Maybe<Scalars['Int']['output']>;
  /** The size of the product */
  product_size?: Maybe<Size>;
  /** The offer of the product size */
  seller_dashboard_offer?: Maybe<ProductOffer>;
  /** The size of the product */
  seller_dashboard_size?: Maybe<Size>;
  /** The size of the product */
  size?: Maybe<Scalars['String']['output']>;
  /** The size id of the product size */
  size_id?: Maybe<Scalars['Int']['output']>;
};

/** A brand */
export type PromoCode = {
  __typename?: 'PromoCode';
  /** The code of the PromoCode */
  code?: Maybe<Scalars['String']['output']>;
  /** The description of the PromoCode */
  description?: Maybe<Scalars['String']['output']>;
  /** The discount of the PromoCode */
  discount?: Maybe<Scalars['Float']['output']>;
  /** The discount type of the PromoCode */
  discount_type?: Maybe<Scalars['String']['output']>;
  /** The end date of the PromoCode */
  end_date?: Maybe<Scalars['String']['output']>;
  /** The id of the PromoCode */
  id?: Maybe<Scalars['Int']['output']>;
  /** The limit per user of the PromoCode */
  limit_per_user?: Maybe<Scalars['Int']['output']>;
  /** The limit total of the PromoCode */
  limit_total?: Maybe<Scalars['Int']['output']>;
  /** The maximum discount of the PromoCode */
  maximum_discount?: Maybe<Scalars['Int']['output']>;
  /** Promo code verification message */
  message?: Maybe<Scalars['String']['output']>;
  /** The minimum spend of the PromoCode */
  minimum_spend?: Maybe<Scalars['Int']['output']>;
  /** The product id of the PromoCode */
  product_id?: Maybe<Scalars['Int']['output']>;
  /** The start date of the PromoCode */
  start_date?: Maybe<Scalars['String']['output']>;
  /** Promo code verification status */
  success?: Maybe<Scalars['Boolean']['output']>;
  /** The target of the PromoCode */
  target?: Maybe<Scalars['String']['output']>;
  /** The target id of the PromoCode */
  target_id?: Maybe<Scalars['Int']['output']>;
  /** The type of the PromoCode */
  type?: Maybe<Scalars['Int']['output']>;
  /** The used count of the PromoCode */
  used_count?: Maybe<Scalars['Int']['output']>;
  /** The user id of the PromoCode */
  user_id?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  ProductOffer?: Maybe<Array<Maybe<ProductOffer>>>;
  SellerDashboard_AdminGetVendorAccounts?: Maybe<Array<Maybe<User>>>;
  SellerDashboard_BrandsAndCategories?: Maybe<SellerDashboard_BrandsAndCategories>;
  SellerDashboard_ConsignmentProductOffer?: Maybe<Array<Maybe<Product>>>;
  SellerDashboard_DirectListingProductOffer?: Maybe<Array<Maybe<ProductOffer>>>;
  SellerDashboard_GetProductDetails?: Maybe<Product>;
  SellerDashboard_GetProductIsConsignment?: Maybe<Scalars['Int']['output']>;
  SellerDashboard_Image?: Maybe<Array<Maybe<ProductImage>>>;
  SellerDashboard_PendingProductOffer?: Maybe<Array<Maybe<ProductOffer>>>;
  SellerDashboard_Products?: Maybe<Array<Maybe<Product>>>;
  SellerDashboard_SoldProductOffer?: Maybe<Array<Maybe<OrderDetail>>>;
  SellerDashboard_Stock?: Maybe<Product>;
  brandAndSize?: Maybe<BrandAndSize>;
  browseProduct?: Maybe<BrowseProduct>;
  lowestActiveOfferAndLastSale?: Maybe<Product>;
  orderSummary?: Maybe<OrderSummary>;
  product?: Maybe<Product>;
  productsForHomePage?: Maybe<HomePageType>;
  userAddress?: Maybe<Array<Maybe<UserAddress>>>;
  userDeliveryAddress?: Maybe<UserAddress>;
  userOrder?: Maybe<OrderPagination>;
  userOrderDetail?: Maybe<Order>;
  userProfile?: Maybe<User>;
  userVacationMode?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryProductOfferArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySellerDashboard_ConsignmentProductOfferArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySellerDashboard_DirectListingProductOfferArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySellerDashboard_GetProductDetailsArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySellerDashboard_GetProductIsConsignmentArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySellerDashboard_ImageArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySellerDashboard_PendingProductOfferArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySellerDashboard_StockArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBrandAndSizeArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBrowseProductArgs = {
  brands?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  category?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sizes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLowestActiveOfferAndLastSaleArgs = {
  product_size_id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOrderSummaryArgs = {
  cart_id?: InputMaybe<Scalars['Int']['input']>;
  cart_item?: InputMaybe<CartItemInput>;
};


export type QueryProductArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserOrderArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserOrderDetailArgs = {
  order_ref: Scalars['String']['input'];
};

/** A section */
export type Section = {
  __typename?: 'Section';
  /** The id of the product */
  id: Scalars['Int']['output'];
  /** A list of products */
  products?: Maybe<Array<Maybe<Product>>>;
  /** The key of the section */
  section_key?: Maybe<Scalars['String']['output']>;
  /** The name of the section */
  section_name?: Maybe<Scalars['String']['output']>;
  /** The sequence of the section */
  sequence?: Maybe<Scalars['Int']['output']>;
};

export type SellerDashboard_BrandsAndCategories = {
  __typename?: 'SellerDashboard_BrandsAndCategories';
  brands?: Maybe<Array<Maybe<Brand>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
};

export type SellerDashboard_PublishPendingOffer = {
  __typename?: 'SellerDashboard_PublishPendingOffer';
  message?: Maybe<Scalars['String']['output']>;
  product_offers?: Maybe<Array<Maybe<ProductOffer>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SellerDashboard_UpdateProductInformation = {
  __typename?: 'SellerDashboard_UpdateProductInformation';
  message?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** A size */
export type Size = {
  __typename?: 'Size';
  /** The id of the section */
  id: Scalars['Int']['output'];
  /** The size of the product size */
  size?: Maybe<Scalars['String']['output']>;
};

export type UrlResponse = {
  __typename?: 'UrlResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

/** A user */
export type User = {
  __typename?: 'User';
  /** The birthdate of the user */
  birthdate?: Maybe<Scalars['String']['output']>;
  /** The email of the user */
  email?: Maybe<Scalars['String']['output']>;
  /** The id of the user */
  id: Scalars['Int']['output'];
  /** The mobile number of the user */
  mobile?: Maybe<Scalars['String']['output']>;
  /** The name of the user */
  name?: Maybe<Scalars['String']['output']>;
  /** The referral code of the user */
  referral_code?: Maybe<Scalars['String']['output']>;
  /** The referrer id of the user */
  referrer_id?: Maybe<Scalars['Int']['output']>;
  /** The role of the user */
  role?: Maybe<Scalars['String']['output']>;
  /** The status of the user */
  status?: Maybe<Scalars['Int']['output']>;
  /** The stripe user account id of the user */
  stripe_user_id?: Maybe<Scalars['String']['output']>;
  /** The vacation mode of the user */
  vacation_mode?: Maybe<Scalars['Int']['output']>;
};

/** A user address */
export type UserAddress = {
  __typename?: 'UserAddress';
  /** The email of the user */
  address_1?: Maybe<Scalars['String']['output']>;
  /** The stripe user account id of the user */
  address_2?: Maybe<Scalars['String']['output']>;
  /** The referrer id of the user */
  address_type?: Maybe<Scalars['String']['output']>;
  /** The referrer id of the user */
  checked?: Maybe<Scalars['Int']['output']>;
  /** The birthdate of the user */
  city?: Maybe<Scalars['String']['output']>;
  /** The mobile number of the user */
  country?: Maybe<Scalars['String']['output']>;
  /** The id of the user */
  id: Scalars['Int']['output'];
  /** The role of the user */
  mobile?: Maybe<Scalars['String']['output']>;
  /** The referral code of the user */
  name?: Maybe<Scalars['String']['output']>;
  /** The name of the user */
  pincode?: Maybe<Scalars['String']['output']>;
  /** The status of the user */
  state?: Maybe<Scalars['String']['output']>;
  /** The referrer id of the user */
  user_id?: Maybe<Scalars['Int']['output']>;
};

export type SellerDashboard_GetProductDetails_SizesFragmentFragment = { __typename?: 'ProductSize', id: number, size?: string | null } & { ' $fragmentName'?: 'SellerDashboard_GetProductDetails_SizesFragmentFragment' };

export type SellerDashboard_ProductDetailsQueryQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type SellerDashboard_ProductDetailsQueryQuery = { __typename?: 'Query', SellerDashboard_GetProductDetails?: { __typename?: 'Product', id: number, slug?: string | null, product_title?: string | null, product_sku?: string | null, category_id?: number | null, brand_id?: number | null, product_description?: string | null, lowest_offer?: number | null, consignment?: number | null, product_sizes?: Array<(
      { __typename?: 'ProductSize', id: number, size?: string | null }
      & { ' $fragmentRefs'?: { 'SellerDashboard_GetProductDetails_SizesFragmentFragment': SellerDashboard_GetProductDetails_SizesFragmentFragment } }
    ) | null> | null } | null };

export type SellerDashboard_GetBrandsAndCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type SellerDashboard_GetBrandsAndCategoriesQuery = { __typename?: 'Query', SellerDashboard_BrandsAndCategories?: { __typename?: 'SellerDashboard_BrandsAndCategories', brands?: Array<{ __typename?: 'Brand', id: number, brand_name?: string | null } | null> | null, categories?: Array<{ __typename?: 'Category', id: number, cat_name?: string | null } | null> | null } | null };

export type SellerDashboard_UpdateProductInformationMutationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  product_title: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  product_sku: Scalars['String']['input'];
  category_id: Scalars['Int']['input'];
  new_category?: InputMaybe<Scalars['String']['input']>;
  brand_id: Scalars['Int']['input'];
  new_brand?: InputMaybe<Scalars['String']['input']>;
  product_description?: InputMaybe<Scalars['String']['input']>;
  lowest_offer: Scalars['Float']['input'];
}>;


export type SellerDashboard_UpdateProductInformationMutationMutation = { __typename?: 'Mutation', SellerDashboard_UpdateProductInformation?: { __typename?: 'SellerDashboard_UpdateProductInformation', success?: boolean | null, message?: string | null, product?: { __typename?: 'Product', id: number, product_title?: string | null, slug?: string | null, product_sku?: string | null, category_id?: number | null, brand_id?: number | null, product_description?: string | null, lowest_offer?: number | null } | null } | null };

export type SellerDashboard_ImageQueryQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type SellerDashboard_ImageQueryQuery = { __typename?: 'Query', SellerDashboard_Image?: Array<{ __typename?: 'ProductImage', image_file?: string | null } | null> | null };

export type SellerDashboard_UpdateStockMutationMutationVariables = Exact<{
  array: Scalars['String']['input'];
}>;


export type SellerDashboard_UpdateStockMutationMutation = { __typename?: 'Mutation', SellerDashboard_UpdateStock?: { __typename?: 'GenericResponse', success: boolean, message?: string | null } | null };

export type Seller_Dashboard__Get_Product_Is_ConsignmentQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type Seller_Dashboard__Get_Product_Is_ConsignmentQuery = { __typename?: 'Query', SellerDashboard_GetProductIsConsignment?: number | null };

export type SellerDashboard_StockQueryQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type SellerDashboard_StockQueryQuery = { __typename?: 'Query', SellerDashboard_Stock?: { __typename?: 'Product', seller_dashboard_product_sizes?: Array<{ __typename?: 'ProductSize', id: number, seller_dashboard_size?: { __typename?: 'Size', size?: string | null } | null, seller_dashboard_offer?: { __typename?: 'ProductOffer', prod_size?: string | null, ready_stock?: number | null } | null } | null> | null } | null };

export type SellerDashboard_ProductFragmentFragment = { __typename?: 'Product', id: number, product_title?: string | null, product_sku?: string | null, slug?: string | null, image?: { __typename?: 'ProductImage', image_file?: string | null } | null } & { ' $fragmentName'?: 'SellerDashboard_ProductFragmentFragment' };

export type SellerDashboard_AdminGetVendorAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type SellerDashboard_AdminGetVendorAccountsQuery = { __typename?: 'Query', SellerDashboard_AdminGetVendorAccounts?: Array<{ __typename?: 'User', id: number, name?: string | null } | null> | null };

export type SellerDashboard_AdminCreateProductMutationMutationVariables = Exact<{
  product_title: Scalars['String']['input'];
  category_id: Scalars['Int']['input'];
  brand_id: Scalars['Int']['input'];
  product_sku: Scalars['String']['input'];
  product_description?: InputMaybe<Scalars['String']['input']>;
  lowest_offer: Scalars['Int']['input'];
  featured: Scalars['Int']['input'];
  consignment: Scalars['Int']['input'];
  user_id: Scalars['Int']['input'];
  images?: InputMaybe<Scalars['String']['input']>;
  sizes?: InputMaybe<Scalars['String']['input']>;
  new_category?: InputMaybe<Scalars['String']['input']>;
  new_brand?: InputMaybe<Scalars['String']['input']>;
}>;


export type SellerDashboard_AdminCreateProductMutationMutation = { __typename?: 'Mutation', SellerDashboard_AdminCreateProduct?: { __typename?: 'GenericResponse', success: boolean, message?: string | null } | null };

export type SellerDashboard_ProductsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SellerDashboard_ProductsQueryQuery = { __typename?: 'Query', SellerDashboard_Products?: Array<(
    { __typename?: 'Product' }
    & { ' $fragmentRefs'?: { 'SellerDashboard_ProductFragmentFragment': SellerDashboard_ProductFragmentFragment } }
  ) | null> | null };

export type CheckoutPage_CreateOrderMutationVariables = Exact<{
  address: Scalars['String']['input'];
  cart: Scalars['String']['input'];
  fulfillment_method: Scalars['String']['input'];
  payment_method_id: Scalars['String']['input'];
  processing_fee_percentage: Scalars['Float']['input'];
  promo_code_id?: InputMaybe<Scalars['Int']['input']>;
  discount_value?: InputMaybe<Scalars['Float']['input']>;
  email_address?: InputMaybe<Scalars['String']['input']>;
}>;


export type CheckoutPage_CreateOrderMutation = { __typename?: 'Mutation', CreateOrder?: { __typename?: 'CreateOrderResponse', success: boolean, url?: string | null, message?: string | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', LoginMutation?: { __typename?: 'LoginResponse', success: boolean, message?: string | null, access_token?: string | null, user?: { __typename?: 'User', id: number, email?: string | null, name?: string | null, role?: string | null } | null } | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  birthdate: Scalars['String']['input'];
  name: Scalars['String']['input'];
  referral_code?: InputMaybe<Scalars['String']['input']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'GenericResponse', success: boolean, message?: string | null } | null };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'GenericResponse', success: boolean, message?: string | null } | null };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'GenericResponse', success: boolean, message?: string | null } | null };

export type CreateProductOfferMutationVariables = Exact<{
  size: Scalars['String']['input'];
  product_size_id: Scalars['Int']['input'];
  price: Scalars['Int']['input'];
  list_type: Scalars['String']['input'];
}>;


export type CreateProductOfferMutation = { __typename?: 'Mutation', createProductOffer?: { __typename?: 'GenericResponse', success: boolean, message?: string | null } | null };

export type UpdateProductOfferMutationVariables = Exact<{
  offer_id: Scalars['Int']['input'];
  price: Scalars['Int']['input'];
}>;


export type UpdateProductOfferMutation = { __typename?: 'Mutation', UpdateProductOffer?: { __typename?: 'GenericResponse', success: boolean, message?: string | null } | null };

export type SellerDashboard_PublishPendingProductOfferMutationMutationVariables = Exact<{
  offer_ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type SellerDashboard_PublishPendingProductOfferMutationMutation = { __typename?: 'Mutation', SellerDashboard_PublishPendingProductOffer?: { __typename?: 'SellerDashboard_PublishPendingOffer', success?: boolean | null, message?: string | null, product_offers?: Array<{ __typename?: 'ProductOffer', id: number, user_id?: number | null, offer_price?: number | null, prod_size?: string | null, created_at?: string | null, product_size_id?: number | null, in_store?: number | null, product?: { __typename?: 'Product', slug?: string | null, product_title?: string | null, product_sku?: string | null, image?: { __typename?: 'ProductImage', image_file?: string | null } | null } | null } | null> | null } | null };

export type UpdateUserProfileMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['String']['input']>;
  vacation_mode?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile?: { __typename?: 'GenericResponse', success: boolean, message?: string | null } | null };

export type UpdateUserPasswordMutationVariables = Exact<{
  current_password?: InputMaybe<Scalars['String']['input']>;
  new_password?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword?: { __typename?: 'GenericResponse', success: boolean, message?: string | null } | null };

export type UpdateUserAddressMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  address_type?: InputMaybe<Scalars['String']['input']>;
  address_1?: InputMaybe<Scalars['String']['input']>;
  address_2?: InputMaybe<Scalars['String']['input']>;
  pincode?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserAddressMutation = { __typename?: 'Mutation', updateUserAddress?: { __typename?: 'GenericResponse', success: boolean, message?: string | null } | null };

export type ApplyPromoCodeMutationVariables = Exact<{
  promoCode: Scalars['String']['input'];
}>;


export type ApplyPromoCodeMutation = { __typename?: 'Mutation', applyPromoCode?: { __typename?: 'PromoCode', success?: boolean | null, id?: number | null, code?: string | null, maximum_discount?: number | null, discount?: number | null, discount_type?: string | null, message?: string | null } | null };

export type OnboardSellerMutationVariables = Exact<{ [key: string]: never; }>;


export type OnboardSellerMutation = { __typename?: 'Mutation', OnboardSeller?: { __typename?: 'UrlResponse', url?: string | null, success: boolean, message?: string | null } | null };

export type GetProductOffersQueryQueryVariables = Exact<{
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductOffersQueryQuery = { __typename?: 'Query', ProductOffer?: Array<{ __typename?: 'ProductOffer', id: number, user_id?: number | null, offer_price?: number | null, prod_size?: string | null, created_at?: string | null, product_size_id?: number | null, in_store?: number | null, product?: { __typename?: 'Product', slug?: string | null, product_title?: string | null, product_sku?: string | null, image?: { __typename?: 'ProductImage', image_file?: string | null } | null } | null } | null> | null };

export type ProductOfferQueryQueryVariables = Exact<{
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProductOfferQueryQuery = { __typename?: 'Query', SellerDashboard_DirectListingProductOffer?: Array<{ __typename?: 'ProductOffer', id: number, user_id?: number | null, offer_price?: number | null, prod_size?: string | null, created_at?: string | null, product_size_id?: number | null, in_store?: number | null, product?: { __typename?: 'Product', slug?: string | null, product_title?: string | null, product_sku?: string | null, image?: { __typename?: 'ProductImage', image_file?: string | null } | null } | null } | null> | null };

export type SellerDashboardConsignmentProductOfferQueryQueryVariables = Exact<{
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type SellerDashboardConsignmentProductOfferQueryQuery = { __typename?: 'Query', SellerDashboard_ConsignmentProductOffer?: Array<{ __typename?: 'Product', product_title?: string | null, product_sku?: string | null, slug?: string | null, lowest_offer?: number | null, image?: { __typename?: 'ProductImage', image_file?: string | null } | null, product_sizes?: Array<{ __typename?: 'ProductSize', size?: string | null, offer?: { __typename?: 'ProductOffer', id: number, offer_price?: number | null, ready_stock?: number | null } | null } | null> | null } | null> | null };

export type SellerDashboardSoldProductOfferQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SellerDashboardSoldProductOfferQueryQuery = { __typename?: 'Query', SellerDashboard_SoldProductOffer?: Array<{ __typename?: 'OrderDetail', quantity?: number | null, product_offer?: { __typename?: 'ProductOffer', offer_price?: number | null, prod_size?: string | null, created_at?: string | null, product_size_id?: number | null, in_store?: number | null, product?: { __typename?: 'Product', slug?: string | null, product_title?: string | null, product_sku?: string | null, image?: { __typename?: 'ProductImage', image_file?: string | null } | null } | null } | null } | null> | null };

export type SellerDashboardPendingProductOfferQueryQueryVariables = Exact<{
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type SellerDashboardPendingProductOfferQueryQuery = { __typename?: 'Query', SellerDashboard_PendingProductOffer?: Array<{ __typename?: 'ProductOffer', id: number, user_id?: number | null, offer_price?: number | null, prod_size?: string | null, created_at?: string | null, product_size_id?: number | null, in_store?: number | null, product?: { __typename?: 'Product', slug?: string | null, product_title?: string | null, product_sku?: string | null, image?: { __typename?: 'ProductImage', image_file?: string | null } | null } | null } | null> | null };

export type GetOrderSummaryQueryVariables = Exact<{
  cartId?: InputMaybe<Scalars['Int']['input']>;
  cartItem?: InputMaybe<CartItemInput>;
}>;


export type GetOrderSummaryQuery = { __typename?: 'Query', orderSummary?: { __typename?: 'OrderSummary', total_exclude_processing_fee?: number | null, cart_details?: Array<{ __typename?: 'CartDetail', offer_id?: number | null, quantity?: number | null, offer?: { __typename?: 'ProductOffer', id: number, prod_size?: string | null, offer_price?: number | null, ready_stock?: number | null, product?: { __typename?: 'Product', id: number, product_title?: string | null, product_sku?: string | null, category_id?: number | null, slug?: string | null, image?: { __typename?: 'ProductImage', image_file?: string | null } | null } | null } | null } | null> | null } | null };

export type GetProductForHomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductForHomePageQuery = { __typename?: 'Query', productsForHomePage?: { __typename?: 'HomePageType', sneakers?: { __typename?: 'HomePageSneaker', products?: Array<{ __typename?: 'Section', section_name?: string | null, products?: Array<{ __typename?: 'Product', product_title?: string | null, slug?: string | null, image?: { __typename?: 'ProductImage', image_file?: string | null } | null, lowest_active_offer?: { __typename?: 'ProductOffer', offer_price?: number | null } | null } | null> | null } | null> | null, recommended?: Array<{ __typename?: 'Product', product_title?: string | null, slug?: string | null, image?: { __typename?: 'ProductImage', image_file?: string | null } | null, lowest_active_offer?: { __typename?: 'ProductOffer', offer_price?: number | null } | null } | null> | null, best_seller_male?: Array<{ __typename?: 'Product', product_title?: string | null, slug?: string | null, lowest_offer?: number | null, image_file?: string | null } | null> | null, best_seller_female?: Array<{ __typename?: 'Product', product_title?: string | null, slug?: string | null, lowest_offer?: number | null, image_file?: string | null } | null> | null } | null, apparels?: { __typename?: 'HomePageApparel', brands?: Array<{ __typename?: 'Brand', brand_name?: string | null, products?: Array<{ __typename?: 'Product', product_title?: string | null, slug?: string | null, image?: { __typename?: 'ProductImage', image_file?: string | null } | null, lowest_active_offer?: { __typename?: 'ProductOffer', offer_price?: number | null } | null } | null> | null } | null> | null, recommended?: Array<{ __typename?: 'Product', product_title?: string | null, slug?: string | null, image?: { __typename?: 'ProductImage', image_file?: string | null } | null, lowest_active_offer?: { __typename?: 'ProductOffer', offer_price?: number | null } | null } | null> | null, best_seller_male?: Array<{ __typename?: 'Product', product_title?: string | null, slug?: string | null, lowest_offer?: number | null, image_file?: string | null } | null> | null, best_seller_female?: Array<{ __typename?: 'Product', product_title?: string | null, slug?: string | null, lowest_offer?: number | null, image_file?: string | null } | null> | null } | null } | null };

export type GetProductQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', product_title?: string | null, product_sku?: string | null, total_quantity_sold?: number | null, lowest_offer?: number | null, slug?: string | null, consignment?: number | null, images?: Array<{ __typename?: 'ProductImage', image_file?: string | null } | null> | null, product_sizes?: Array<{ __typename?: 'ProductSize', id: number, size?: string | null, size_id?: number | null, offer?: { __typename?: 'ProductOffer', id: number, offer_price?: number | null, ready_stock?: number | null, is_active?: number | null, deleted?: number | null } | null, online_offer?: { __typename?: 'ProductOffer', id: number, offer_price?: number | null, ready_stock?: number | null } | null, in_store_offer?: { __typename?: 'ProductOffer', id: number, offer_price?: number | null, ready_stock?: number | null } | null } | null> | null } | null };

export type GetLowestActiveOfferAndLastSaleQueryVariables = Exact<{
  product_size_id: Scalars['Int']['input'];
}>;


export type GetLowestActiveOfferAndLastSaleQuery = { __typename?: 'Query', lowestActiveOfferAndLastSale?: { __typename?: 'Product', lowest_offer?: number | null, last_sale?: { __typename?: 'OrderDetail', id: number, created_at?: string | null, unit_price?: number | null, size?: string | null } | null } | null };

export type GetBrandsAndSizesForBrowsePageQueryVariables = Exact<{
  category?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBrandsAndSizesForBrowsePageQuery = { __typename?: 'Query', brandAndSize?: { __typename?: 'BrandAndSize', brands?: string | null, sizes?: string | null } | null };

export type GetProductsForBrowsePageQueryVariables = Exact<{
  category?: InputMaybe<Scalars['String']['input']>;
  brands?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  sizes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductsForBrowsePageQuery = { __typename?: 'Query', browseProduct?: { __typename?: 'BrowseProduct', total?: number | null, per_page?: number | null, current_page?: number | null, from?: number | null, to?: number | null, last_page?: number | null, has_more_pages?: boolean | null, data?: Array<{ __typename?: 'Product', category_id?: number | null, product_title?: string | null, image_file?: string | null, slug?: string | null, lowest_offer?: number | null } | null> | null } | null };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'Query', userProfile?: { __typename?: 'User', id: number, name?: string | null, email?: string | null, mobile?: string | null, birthdate?: string | null, referral_code?: string | null } | null };

export type GetVacationModeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVacationModeQuery = { __typename?: 'Query', vacation_mode?: number | null };

export type GetUserAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserAddressesQuery = { __typename?: 'Query', userAddress?: Array<{ __typename?: 'UserAddress', name?: string | null, address_type?: string | null, id: number, address_1?: string | null, address_2?: string | null, pincode?: string | null, city?: string | null, country?: string | null, state?: string | null, mobile?: string | null } | null> | null };

export type GetUserDeliveryAddressQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDeliveryAddressQuery = { __typename?: 'Query', userDeliveryAddress?: { __typename?: 'UserAddress', name?: string | null, address_type?: string | null, id: number, address_1?: string | null, address_2?: string | null, pincode?: string | null, city?: string | null, country?: string | null, state?: string | null, mobile?: string | null } | null };

export type GetOrderHistoryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetOrderHistoryQuery = { __typename?: 'Query', userOrder?: { __typename?: 'OrderPagination', total: number, per_page: number, current_page: number, from?: number | null, to?: number | null, last_page: number, has_more_pages: boolean, data: Array<{ __typename?: 'Order', order_ref?: string | null, created_at?: string | null, order_total?: number | null }> } | null };

export type GetOrderDetailsQueryVariables = Exact<{
  orderRef: Scalars['String']['input'];
}>;


export type GetOrderDetailsQuery = { __typename?: 'Query', userOrderDetail?: { __typename?: 'Order', order_total?: number | null, address?: string | null, created_at?: string | null, order_details?: Array<{ __typename?: 'OrderDetail', quantity?: number | null, unit_price?: number | null, total_price?: number | null, price?: number | null, size?: string | null, product?: { __typename?: 'Product', product_title?: string | null, slug?: string | null } | null } | null> | null } | null };

export const SellerDashboard_GetProductDetails_SizesFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SellerDashboard_GetProductDetails_SizesFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductSize"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}}]} as unknown as DocumentNode<SellerDashboard_GetProductDetails_SizesFragmentFragment, unknown>;
export const SellerDashboard_ProductFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SellerDashboard_ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"product_sku"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}}]}}]} as unknown as DocumentNode<SellerDashboard_ProductFragmentFragment, unknown>;
export const SellerDashboard_ProductDetailsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SellerDashboard_ProductDetailsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_GetProductDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"product_sku"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"brand_id"}},{"kind":"Field","name":{"kind":"Name","value":"product_description"}},{"kind":"Field","name":{"kind":"Name","value":"lowest_offer"}},{"kind":"Field","name":{"kind":"Name","value":"consignment"}},{"kind":"Field","name":{"kind":"Name","value":"product_sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SellerDashboard_GetProductDetails_SizesFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SellerDashboard_GetProductDetails_SizesFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductSize"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}}]} as unknown as DocumentNode<SellerDashboard_ProductDetailsQueryQuery, SellerDashboard_ProductDetailsQueryQueryVariables>;
export const SellerDashboard_GetBrandsAndCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SellerDashboard_GetBrandsAndCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_BrandsAndCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"brand_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cat_name"}}]}}]}}]}}]} as unknown as DocumentNode<SellerDashboard_GetBrandsAndCategoriesQuery, SellerDashboard_GetBrandsAndCategoriesQueryVariables>;
export const SellerDashboard_UpdateProductInformationMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SellerDashboard_UpdateProductInformationMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product_title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product_sku"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"new_category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brand_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"new_brand"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product_description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lowest_offer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_UpdateProductInformation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"product_title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product_title"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"product_sku"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product_sku"}}},{"kind":"Argument","name":{"kind":"Name","value":"category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"new_category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"new_category"}}},{"kind":"Argument","name":{"kind":"Name","value":"brand_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brand_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"new_brand"},"value":{"kind":"Variable","name":{"kind":"Name","value":"new_brand"}}},{"kind":"Argument","name":{"kind":"Name","value":"product_description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product_description"}}},{"kind":"Argument","name":{"kind":"Name","value":"lowest_offer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lowest_offer"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"product_sku"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"brand_id"}},{"kind":"Field","name":{"kind":"Name","value":"product_description"}},{"kind":"Field","name":{"kind":"Name","value":"lowest_offer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SellerDashboard_UpdateProductInformationMutationMutation, SellerDashboard_UpdateProductInformationMutationMutationVariables>;
export const SellerDashboard_ImageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SellerDashboard_ImageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_Image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}}]}}]} as unknown as DocumentNode<SellerDashboard_ImageQueryQuery, SellerDashboard_ImageQueryQueryVariables>;
export const SellerDashboard_UpdateStockMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SellerDashboard_UpdateStockMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"array"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_UpdateStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"array"},"value":{"kind":"Variable","name":{"kind":"Name","value":"array"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SellerDashboard_UpdateStockMutationMutation, SellerDashboard_UpdateStockMutationMutationVariables>;
export const Seller_Dashboard__Get_Product_Is_ConsignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SELLER_DASHBOARD__GET_PRODUCT_IS_CONSIGNMENT"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_GetProductIsConsignment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}]}}]} as unknown as DocumentNode<Seller_Dashboard__Get_Product_Is_ConsignmentQuery, Seller_Dashboard__Get_Product_Is_ConsignmentQueryVariables>;
export const SellerDashboard_StockQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SellerDashboard_StockQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_Stock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seller_dashboard_product_sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seller_dashboard_size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seller_dashboard_offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"prod_size"}},{"kind":"Field","name":{"kind":"Name","value":"ready_stock"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SellerDashboard_StockQueryQuery, SellerDashboard_StockQueryQueryVariables>;
export const SellerDashboard_AdminGetVendorAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SellerDashboard_AdminGetVendorAccounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_AdminGetVendorAccounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SellerDashboard_AdminGetVendorAccountsQuery, SellerDashboard_AdminGetVendorAccountsQueryVariables>;
export const SellerDashboard_AdminCreateProductMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SellerDashboard_AdminCreateProductMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product_title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brand_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product_sku"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product_description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lowest_offer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"featured"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"consignment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"images"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sizes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"new_category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"new_brand"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_AdminCreateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"product_title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product_title"}}},{"kind":"Argument","name":{"kind":"Name","value":"category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"brand_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brand_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"product_sku"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product_sku"}}},{"kind":"Argument","name":{"kind":"Name","value":"product_description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product_description"}}},{"kind":"Argument","name":{"kind":"Name","value":"lowest_offer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lowest_offer"}}},{"kind":"Argument","name":{"kind":"Name","value":"featured"},"value":{"kind":"Variable","name":{"kind":"Name","value":"featured"}}},{"kind":"Argument","name":{"kind":"Name","value":"consignment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"consignment"}}},{"kind":"Argument","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"images"},"value":{"kind":"Variable","name":{"kind":"Name","value":"images"}}},{"kind":"Argument","name":{"kind":"Name","value":"sizes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sizes"}}},{"kind":"Argument","name":{"kind":"Name","value":"new_category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"new_category"}}},{"kind":"Argument","name":{"kind":"Name","value":"new_brand"},"value":{"kind":"Variable","name":{"kind":"Name","value":"new_brand"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SellerDashboard_AdminCreateProductMutationMutation, SellerDashboard_AdminCreateProductMutationMutationVariables>;
export const SellerDashboard_ProductsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SellerDashboard_ProductsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_Products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SellerDashboard_ProductFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SellerDashboard_ProductFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"product_sku"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}}]}}]} as unknown as DocumentNode<SellerDashboard_ProductsQueryQuery, SellerDashboard_ProductsQueryQueryVariables>;
export const CheckoutPage_CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CheckoutPage_CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cart"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fulfillment_method"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payment_method_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"processing_fee_percentage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"promo_code_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discount_value"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email_address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"cart"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cart"}}},{"kind":"Argument","name":{"kind":"Name","value":"fulfillment_method"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fulfillment_method"}}},{"kind":"Argument","name":{"kind":"Name","value":"payment_method_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payment_method_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"processing_fee_percentage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"processing_fee_percentage"}}},{"kind":"Argument","name":{"kind":"Name","value":"promo_code_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"promo_code_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"discount_value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discount_value"}}},{"kind":"Argument","name":{"kind":"Name","value":"email_address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email_address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CheckoutPage_CreateOrderMutation, CheckoutPage_CreateOrderMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"LoginMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mobile"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birthdate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"referral_code"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"mobile"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mobile"}}},{"kind":"Argument","name":{"kind":"Name","value":"birthdate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birthdate"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"referral_code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"referral_code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const CreateProductOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProductOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product_size_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"list_type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}},{"kind":"Argument","name":{"kind":"Name","value":"product_size_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product_size_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}},{"kind":"Argument","name":{"kind":"Name","value":"list_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"list_type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateProductOfferMutation, CreateProductOfferMutationVariables>;
export const UpdateProductOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProductOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offer_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UpdateProductOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offer_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offer_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateProductOfferMutation, UpdateProductOfferMutationVariables>;
export const SellerDashboard_PublishPendingProductOfferMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SellerDashboard_PublishPendingProductOfferMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offer_ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_PublishPendingProductOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offer_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offer_ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"product_offers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"offer_price"}},{"kind":"Field","name":{"kind":"Name","value":"prod_size"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"product_size_id"}},{"kind":"Field","name":{"kind":"Name","value":"in_store"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"product_sku"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SellerDashboard_PublishPendingProductOfferMutationMutation, SellerDashboard_PublishPendingProductOfferMutationMutationVariables>;
export const UpdateUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mobile"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birthdate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vacation_mode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"mobile"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mobile"}}},{"kind":"Argument","name":{"kind":"Name","value":"birthdate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birthdate"}}},{"kind":"Argument","name":{"kind":"Name","value":"vacation_mode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vacation_mode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const UpdateUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"current_password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"new_password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"current_password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"current_password"}}},{"kind":"Argument","name":{"kind":"Name","value":"new_password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"new_password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const UpdateUserAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address_type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address_1"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address_2"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mobile"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"address_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address_type"}}},{"kind":"Argument","name":{"kind":"Name","value":"address_1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address_1"}}},{"kind":"Argument","name":{"kind":"Name","value":"address_2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address_2"}}},{"kind":"Argument","name":{"kind":"Name","value":"pincode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}}},{"kind":"Argument","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}},{"kind":"Argument","name":{"kind":"Name","value":"mobile"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mobile"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>;
export const ApplyPromoCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyPromoCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"promoCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyPromoCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"promo_code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"promoCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"maximum_discount"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"discount_type"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ApplyPromoCodeMutation, ApplyPromoCodeMutationVariables>;
export const OnboardSellerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OnboardSeller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnboardSeller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<OnboardSellerMutation, OnboardSellerMutationVariables>;
export const GetProductOffersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductOffersQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ProductOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"offer_price"}},{"kind":"Field","name":{"kind":"Name","value":"prod_size"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"product_size_id"}},{"kind":"Field","name":{"kind":"Name","value":"in_store"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"product_sku"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductOffersQueryQuery, GetProductOffersQueryQueryVariables>;
export const ProductOfferQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductOfferQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_DirectListingProductOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"offer_price"}},{"kind":"Field","name":{"kind":"Name","value":"prod_size"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"product_size_id"}},{"kind":"Field","name":{"kind":"Name","value":"in_store"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"product_sku"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductOfferQueryQuery, ProductOfferQueryQueryVariables>;
export const SellerDashboardConsignmentProductOfferQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SellerDashboardConsignmentProductOfferQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_ConsignmentProductOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"product_sku"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"lowest_offer"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product_sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"offer_price"}},{"kind":"Field","name":{"kind":"Name","value":"ready_stock"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SellerDashboardConsignmentProductOfferQueryQuery, SellerDashboardConsignmentProductOfferQueryQueryVariables>;
export const SellerDashboardSoldProductOfferQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SellerDashboardSoldProductOfferQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_SoldProductOffer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"product_offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offer_price"}},{"kind":"Field","name":{"kind":"Name","value":"prod_size"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"product_size_id"}},{"kind":"Field","name":{"kind":"Name","value":"in_store"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"product_sku"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SellerDashboardSoldProductOfferQueryQuery, SellerDashboardSoldProductOfferQueryQueryVariables>;
export const SellerDashboardPendingProductOfferQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SellerDashboardPendingProductOfferQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SellerDashboard_PendingProductOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"offer_price"}},{"kind":"Field","name":{"kind":"Name","value":"prod_size"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"product_size_id"}},{"kind":"Field","name":{"kind":"Name","value":"in_store"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"product_sku"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SellerDashboardPendingProductOfferQueryQuery, SellerDashboardPendingProductOfferQueryQueryVariables>;
export const GetOrderSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrderSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartItem"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CartItemInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cart_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}},{"kind":"Argument","name":{"kind":"Name","value":"cart_item"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartItem"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_exclude_processing_fee"}},{"kind":"Field","name":{"kind":"Name","value":"cart_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offer_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"prod_size"}},{"kind":"Field","name":{"kind":"Name","value":"offer_price"}},{"kind":"Field","name":{"kind":"Name","value":"ready_stock"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"product_sku"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrderSummaryQuery, GetOrderSummaryQueryVariables>;
export const GetProductForHomePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductForHomePage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsForHomePage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sneakers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"section_name"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lowest_active_offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offer_price"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recommended"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lowest_active_offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offer_price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"best_seller_male"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"lowest_offer"}},{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}},{"kind":"Field","name":{"kind":"Name","value":"best_seller_female"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"lowest_offer"}},{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"apparels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand_name"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lowest_active_offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offer_price"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recommended"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lowest_active_offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offer_price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"best_seller_male"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"lowest_offer"}},{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}},{"kind":"Field","name":{"kind":"Name","value":"best_seller_female"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"lowest_offer"}},{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductForHomePageQuery, GetProductForHomePageQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"product_sku"}},{"kind":"Field","name":{"kind":"Name","value":"total_quantity_sold"}},{"kind":"Field","name":{"kind":"Name","value":"lowest_offer"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"consignment"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_file"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product_sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"size_id"}},{"kind":"Field","name":{"kind":"Name","value":"offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"offer_price"}},{"kind":"Field","name":{"kind":"Name","value":"ready_stock"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"ready_stock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"online_offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"offer_price"}},{"kind":"Field","name":{"kind":"Name","value":"ready_stock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"in_store_offer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"offer_price"}},{"kind":"Field","name":{"kind":"Name","value":"ready_stock"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const GetLowestActiveOfferAndLastSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLowestActiveOfferAndLastSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product_size_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lowestActiveOfferAndLastSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"product_size_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product_size_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lowest_offer"}},{"kind":"Field","name":{"kind":"Name","value":"last_sale"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"unit_price"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}}]}}]}}]} as unknown as DocumentNode<GetLowestActiveOfferAndLastSaleQuery, GetLowestActiveOfferAndLastSaleQueryVariables>;
export const GetBrandsAndSizesForBrowsePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBrandsAndSizesForBrowsePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brandAndSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brands"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}}]}}]}}]} as unknown as DocumentNode<GetBrandsAndSizesForBrowsePageQuery, GetBrandsAndSizesForBrowsePageQueryVariables>;
export const GetProductsForBrowsePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductsForBrowsePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brands"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sizes"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"browseProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"brands"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brands"}}},{"kind":"Argument","name":{"kind":"Name","value":"sizes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sizes"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"image_file"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"lowest_offer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"per_page"}},{"kind":"Field","name":{"kind":"Name","value":"current_page"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"last_page"}},{"kind":"Field","name":{"kind":"Name","value":"has_more_pages"}}]}}]}}]} as unknown as DocumentNode<GetProductsForBrowsePageQuery, GetProductsForBrowsePageQueryVariables>;
export const GetUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"birthdate"}},{"kind":"Field","name":{"kind":"Name","value":"referral_code"}}]}}]}}]} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const GetVacationModeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVacationMode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"vacation_mode"},"name":{"kind":"Name","value":"userVacationMode"}}]}}]} as unknown as DocumentNode<GetVacationModeQuery, GetVacationModeQueryVariables>;
export const GetUserAddressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserAddresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address_type"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address_1"}},{"kind":"Field","name":{"kind":"Name","value":"address_2"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}}]}}]}}]} as unknown as DocumentNode<GetUserAddressesQuery, GetUserAddressesQueryVariables>;
export const GetUserDeliveryAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserDeliveryAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDeliveryAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address_type"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address_1"}},{"kind":"Field","name":{"kind":"Name","value":"address_2"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}}]}}]}}]} as unknown as DocumentNode<GetUserDeliveryAddressQuery, GetUserDeliveryAddressQueryVariables>;
export const GetOrderHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrderHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order_ref"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"order_total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"per_page"}},{"kind":"Field","name":{"kind":"Name","value":"current_page"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"last_page"}},{"kind":"Field","name":{"kind":"Name","value":"has_more_pages"}}]}}]}}]} as unknown as DocumentNode<GetOrderHistoryQuery, GetOrderHistoryQueryVariables>;
export const GetOrderDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrderDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderRef"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userOrderDetail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_ref"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderRef"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order_total"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"order_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product_title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit_price"}},{"kind":"Field","name":{"kind":"Name","value":"total_price"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}}]}}]}}]} as unknown as DocumentNode<GetOrderDetailsQuery, GetOrderDetailsQueryVariables>;