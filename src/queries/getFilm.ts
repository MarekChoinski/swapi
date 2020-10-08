import { gql } from "@apollo/client";

export const GET_FILM = gql`
  query GetFilm($id: ID!){
    film(id: $id) {
      planetConnection{
        planets{
          name,
          rotationPeriod,
          orbitalPeriod,
          diameter,
          climates,
          surfaceWater,
          population
        }
      }
    }
  }
`;