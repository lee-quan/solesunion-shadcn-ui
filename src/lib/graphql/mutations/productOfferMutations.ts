import { graphql } from "@/gql";
import gql from "graphql-tag";

export const CREATE_PRODUCT_OFFER = gql`
  mutation CreateProductOffer(
    $size: String!
    $product_size_id: Int!
    $price: Int!
    $list_type: String!
  ) {
    createProductOffer(
      size: $size
      product_size_id: $product_size_id
      price: $price
      list_type: $list_type
    ) {
      success
      message
    }
  }
`;

export const UPDATE_PRODUCT_OFFER = gql`
  mutation UpdateProductOffer($offer_id: Int!, $price: Int!) {
    UpdateProductOffer(offer_id: $offer_id, price: $price) {
      success
      message
    }
  }
`;

// export const SELLER_DASHBOARD__PUBLISH_PENDING_PRODUCT_OFFER = gql`

// `;

export const SELLER_DASHBOARD__PUBLISH_PENDING_PRODUCT_OFFER = graphql(`
  mutation SellerDashboard_PublishPendingProductOfferMutation(
    $offer_ids: [Int!]!
  ) {
    SellerDashboard_PublishPendingProductOffer(offer_ids: $offer_ids) {
      success
      message
      product_offers {
        id
        user_id
        offer_price
        prod_size
        created_at
        product_size_id
        in_store
        product {
          slug
          product_title
          product_sku
          image {
            image_file
          }
        }
      }
    }
  }
`);
