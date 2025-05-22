import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      price
      picture
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      title
    }
  }
`;
