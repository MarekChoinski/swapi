import React, { useEffect } from 'react';
import Collapse from './Collapse';
import { ReactComponent as Logo } from '../assets/logo.svg';
import SortableTable from './SortableTable';
import { Film } from '../interfaces/Film.interface';
import { useQuery, gql } from '@apollo/client';
import Footer from './Footer';
import MovieForm from './MovieForm';
import { GET_ALL_FILMS } from '../queries/getAllFilms';
import { useSelector } from 'react-redux';
import { IMoviesState } from '../redux/reducer';

const App: React.FC = () => {

  const cachedMovies = useSelector((state: IMoviesState) => state.movies)

  const { loading, error, data } = useQuery(GET_ALL_FILMS);
  useEffect(() => {
    console.log(loading, error, data);

  }, [loading, error, data]);

  useEffect(() => {
    console.log("app", cachedMovies);

  }, [cachedMovies]);

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
