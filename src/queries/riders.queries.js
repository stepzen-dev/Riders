import { gql } from "@apollo/client";

export const GET_RIDER = gql`
  query GetRidersById($id: ID!) {
    rider(id: $id) {
      first_name
      id
      last_name
      rideSlugs {
        slug
        myRides {
          continent
          countries
          description
          height
          id
          image
          slug
          title
          updated_at
        }
      }
    }
  }
`;

export const GET_RIDERS = gql`
  query GetRidersById {
    riders {
      first_name
      id
      last_name
      rideSlugs {
        slug
        myRides {
          continent
          countries
          description
          height
          id
          image
          slug
          title
          updated_at
        }
      }
    }
  }
`;
