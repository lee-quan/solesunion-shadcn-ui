import gql from "graphql-tag";

export const GET_ORDER_SUMMARY = gql`
  query GetOrderSummary($cartId: Int, $cartItem: CartItemInput) {
    orderSummary(cart_id: $cartId, cart_item: $cartItem) {
      total_exclude_processing_fee
      cart_details {
        offer_id
        quantity
        offer {
          id
          prod_size
          offer_price
          ready_stock
          product {
            id
            product_title
            product_sku
            category_id
            slug
            image {
              image_file
            }
          }
        }
      }
    }
  }
`;
