import gql from "graphql-tag";

export const APPLY_PROMO_CODE = gql`
  mutation ApplyPromoCode($promoCode: String!) {
    applyPromoCode(promo_code: $promoCode) {
      success
      id
      code
      maximum_discount
      discount
      discount_type
      success
      message
    }
  }
`;
