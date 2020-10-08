import React, { useEffect } from 'react';
import Collapse from './Collapse';
import { ReactComponent as Logo } from '../assets/logo.svg';
import SortableTable from './SortableTable';
import { Film } from '../interfaces/Film.interface';
import { useQuery, gql } from '@apollo/client';
import Footer from './Footer';
import MovieForm from './MovieForm';

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
            <SortableTable key={film.id} title={film.title} id={film.id} />
          )
        })
      }

      <hr className="divider" />

      <MovieForm />

      <Footer />

    </main >
  );
}

export default App;
