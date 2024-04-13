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
