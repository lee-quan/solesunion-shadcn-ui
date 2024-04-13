import gql from "graphql-tag";

export const UPDATE_USER_PROFILE = gql`
    mutation UpdateUserProfile(
        $name: String
        $email: String
        $mobile: String
        $birthdate: String
        $vacation_mode: Int
    ) {
        updateUserProfile(
            name: $name
            email: $email
            mobile: $mobile
            birthdate: $birthdate
            vacation_mode: $vacation_mode
        ) {
            success
            message
        }
    }
`;

export const UPDATE_USER_PASSWORD = gql`
    mutation UpdateUserPassword(
        $current_password: String
        $new_password: String
    ) {
        updateUserPassword(
            current_password: $current_password
            new_password: $new_password
        ) {
            success
            message
        }
    }
`;

export const UPDATE_USER_ADDRESS = gql`
    mutation UpdateUserAddress(
        $id: Int
        $name: String
        $address_type: String
        $address_1: String
        $address_2: String
        $pincode: String
        $city: String
        $country: String
        $state: String
        $mobile: String
    ) {
        updateUserAddress(
            id: $id
            name: $name
            address_type: $address_type
            address_1: $address_1
            address_2: $address_2
            pincode: $pincode
            city: $city
            country: $country
            state: $state
            mobile: $mobile
        ) {
            success
            message
        }
    }
`;
