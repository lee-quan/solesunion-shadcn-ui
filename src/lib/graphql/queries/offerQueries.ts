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
        image {
          image_file
        }
      }
    }
  }
`;
export const SELLER_DASHBOARD__DIRECT_LISTING_PRODUCT_OFFER = gql`
  query ProductOfferQuery($status: String) {
    SellerDashboard_DirectListingProductOffer(status: $status) {
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
`;

export const SELLER_DASHBOARD__CONSIGNMENT_PRODUCT_OFFER = gql`
  query SellerDashboardConsignmentProductOfferQuery($status: String) {
    SellerDashboard_ConsignmentProductOffer(status: $status) {
      product_title
      product_sku
      slug
      lowest_offer
      image {
        image_file
      }
      product_sizes {
        size
        offer {
          id
          offer_price
          ready_stock
        }
      }
    }
  }
`;

export const SELLER_DASHBOARD__SOLD_PRODUCT_OFFER = gql`
  query SellerDashboardSoldProductOfferQuery {
    SellerDashboard_SoldProductOffer {
      quantity
      product_offer {
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
`;