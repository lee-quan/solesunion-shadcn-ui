import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        LoginMutation(email: $email, password: $password) {
            user {
                id
                email
                name
                role
            }
            success
            message
            access_token
        }
    }
`;

export const REGISTER_MUTATION = gql`
    mutation Register(
        $email: String!
        $password: String!
        $mobile: String!
        $birthdate: String!
        $name: String!
        $referral_code: String
    ) {
        register(
            email: $email
            password: $password
            mobile: $mobile
            birthdate: $birthdate
            name: $name
            referral_code: $referral_code
        ) {
            success
            message
        }
    }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email) {
            success
            message
        }
    }
`;

export const RESET_PASSWORD_MUTATION = gql`
    mutation ResetPassword(
        $email: String!
        $password: String!
        $token: String!
    ) {
        resetPassword(email: $email, password: $password, token: $token) {
            success
            message
        }
    }
`;
