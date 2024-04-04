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
