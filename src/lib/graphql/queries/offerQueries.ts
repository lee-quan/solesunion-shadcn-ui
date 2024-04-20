import gql from "graphql-tag";

export const GET_PRODUCT_OFFERS = gql`
  query ProductOfferQuery($status: String) {
    ProductOffer(status: $status) {
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
        images {
          image_file
        }
      }
    }
  }
`;
