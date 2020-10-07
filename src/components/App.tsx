import React, { useEffect } from 'react';
import Collapse from './Collapse';
import { ReactComponent as Logo } from '../assets/logo.svg';
import SortableTable from './SortableTable';
import { Film } from '../interfaces/Film.interface';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_FILMS = gql`
  query GetAllFilms{
    allFilms {
      films {
        id,
        title
      }
    }
  }
`;

const data2: Film = {
  "data": {
    "film": {
      "planetConnection": {
        "planets": [
          {
            "name": "Tatooine",
            "rotationPeriod": 23,
            "orbitalPeriod": 304,
            "diameter": 10465,
            "climates": [
              "arid"
            ],
            "surfaceWater": 1,
            "population": 200000
          },
          {
            "name": "Alderaan",
            "rotationPeriod": 24,
            "orbitalPeriod": 364,
            "diameter": 12500,
            "climates": [
              "temperate",
              "arid"
            ],
            "surfaceWater": 40,
            "population": 2000000000
          },
          {
            "name": "Yavin IV",
            "rotationPeriod": 24,
            "orbitalPeriod": 4818,
            "diameter": 10200,
            "climates": [
              "temperate",
              "tropical"
            ],
            "surfaceWater": 8,
            "population": 1000
          }
        ]
      }
    }
  }
}






const App: React.FC = () => {

  const { loading, error, data } = useQuery(GET_ALL_FILMS);
  useEffect(() => {
    console.log(loading, error, data);

  }, [loading, error, data]);

  return (
    <main className="app">
      <header className="logo" >
        <Logo />
      </header>
      <Collapse title="Test something">
        <SortableTable data={data2.data.film.planetConnection.planets} />
      </Collapse>
      <Collapse title="Test something">
        <SortableTable data={data2.data.film.planetConnection.planets} />
      </Collapse>
    </main>
  );
}

export default App;
