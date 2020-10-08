import { gql } from "@apollo/client";

export const GET_ALL_PLANETS = gql`
  query GetAllFilms{
    allPlanets {
      planets{
        name
      }
    }
  }
`;