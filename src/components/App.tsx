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

      {loading ?
        <span>Loading</span> :
        data.allFilms.films.map((film: any) => {
          return (
            <Collapse title={film.title} id={film.string} />
          )
        })

      }

    </main >
  );
}

export default App;
