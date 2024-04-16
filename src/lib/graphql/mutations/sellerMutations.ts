import gql from "graphql-tag";

export const ONBOARD_SELLER = gql`
  mutation OnboardSeller {
    OnboardSeller {
      url
      success
      message
    }
  }
`;
