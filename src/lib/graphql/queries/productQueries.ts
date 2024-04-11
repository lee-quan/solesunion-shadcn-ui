import gql from "graphql-tag";

export const GET_PRODUCT_FOR_HOME_PAGE = gql`
  query GetProductForHomePage {
    productsForHomePage {
      sneakers {
        products {
          section_name
          products {
            product_title
            slug
            image {
              image_file
            }
            lowest_active_offer {
              offer_price
            }
          }
        }
        recommended {
          product_title
          slug
          image {
            image_file
          }
          lowest_active_offer {
            offer_price
          }
        }
        best_seller_male {
          product_title
          slug
          lowest_offer
          image_file
        }
        best_seller_female {
          product_title
          slug
          lowest_offer
          image_file
        }
      }
      apparels {
        brands {
          brand_name
          products {
            product_title
            slug
            image {
              image_file
            }
            lowest_active_offer {
              offer_price
            }
          }
        }
        recommended {
          product_title
          slug
          image {
            image_file
          }
          lowest_active_offer {
            offer_price
          }
        }
        best_seller_male {
          product_title
          slug
          lowest_offer
          image_file
        }
        best_seller_female {
          product_title
          slug
          lowest_offer
          image_file
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($slug: String!) {
    product(slug: $slug) {
      product_title
      product_sku
      total_quantity_sold
      lowest_offer
      slug
      consignment
      images {
        image_file
      }
      product_sizes {
        id
        size
        size_id
        offer {
          id
          offer_price
          ready_stock
        }
        online_offer {
          id
          offer_price
          ready_stock
        }
        in_store_offer {
          id
          offer_price
          ready_stock
        }
      }
    }
  }
`;

export const GET_LOWEST_ACTIVE_OFFER_AND_LAST_SALE = gql`
  query GetLowestActiveOfferAndLastSale($product_size_id: Int!) {
    lowestActiveOfferAndLastSale(product_size_id: $product_size_id) {
      lowest_offer
      last_sale {
        id
        created_at
        unit_price
        size
      }
    }
  }
`;

export const GET_BRANDS_AND_SIZES_FOR_BROWSE_PAGE = gql`
  query GetBrandsAndSizesForBrowsePage($category: String) {
    brandAndSize(category: $category) {
      brands
      sizes
    }
  }
`;

export const GET_PRODUCTS_FOR_BROWSE_PAGE = gql`
  query GetProductsForBrowsePage(
    $category: String
    $brands: [String]
    $sizes: [String]
    $page: Int
    $sortBy: String
  ) {
    browseProduct(
      category: $category
      brands: $brands
      sizes: $sizes
      page: $page
      sort_by: $sortBy
    ) {
      data {
        product_title
        image_file
        slug
        lowest_offer
      }
      total
      per_page
      current_page
      from
      to
      last_page
      has_more_pages
    }
  }
`;
