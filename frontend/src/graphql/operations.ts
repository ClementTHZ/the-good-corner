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

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      title
      ads {
        id
        title
      }
    }
  }
`;

export const GET_AD = gql`
  query GetAdById($getAdId: Float!) {
    getAdById(id: $getAdId) {
      title
      description
      owner
      price
      picture
      city
      createdAt
      category {
        title
        id
      }
      tags {
        id
        title
      }
    }
  }
`;

export const GET_ALL_CATEGORIES_AND_TAG = gql`
  query getAllCategoriesAndTags {
    getAllCategories {
      id
      title
    }
    getAllTags {
      id
      title
    }
  }
`;

export const DELETE_AD = gql`
  mutation deleteAd($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`;

export const CREATE_AD = gql`
  mutation createAd($data: AdInput!) {
    createAd(data: $data)
  }
`;
