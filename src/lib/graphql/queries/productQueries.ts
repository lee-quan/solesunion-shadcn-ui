import gql from "graphql-tag";

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
