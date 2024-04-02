import gql from "graphql-tag";

export const GET_USER_PROFILE = gql`
    query GetUserProfile {
        userProfile {
            id
            name
            email
            mobile
            birthdate
            referral_code
        }
    }
`;

export const GET_VACATION_MODE = gql`
    query GetVacationMode {
        vacation_mode: userVacationMode
    }
`;

export const GET_USER_ADDRESSES = gql`
    query GetUserAddresses {
        userAddress {
            name
            address_type
            id
            address_1
            address_2
            pincode
            city
            country
            state
            mobile
        }
    }
`;

export const GET_ORDER_HISTORY = gql`
    query GetOrderHistory($limit: Int, $page: Int) {
        userOrder(limit: $limit, page: $page) {
            data {
                order_ref
                created_at
                order_total
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

export const GET_ORDER_DETAILS = gql`
    query GetOrderDetails($orderRef: String!) {
        userOrderDetail(order_ref: $orderRef) {
            order_total
            address
            created_at
            order_details {
                product {
                    product_title
                    slug
                }
                quantity
                unit_price
                total_price
                price
                size
            }
        }
    }
`;
