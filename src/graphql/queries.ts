import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query Query {
    countries {
      name
      native
      capital
      emoji
      code
      currency
      continent {
        name
        code
      }
      languages {
        code
        name
      }
    }
  }
`;
export const GET_CONTINENTS = gql`
  query Query {
    continents {
      name
      code
    }
  }
`;
