import { gql } from "@apollo/client";

export const GET_ALL_PLANETS_DATA = gql`
  query GetAllPlanetsData{
    allPlanets {
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
`;