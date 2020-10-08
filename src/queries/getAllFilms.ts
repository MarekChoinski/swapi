import { gql } from "@apollo/client";

export const GET_ALL_FILMS = gql`
  query GetAllFilms{
    allFilms {
      films {
        id,
        title
      }
    }
  }
`;