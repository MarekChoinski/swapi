import React, { useEffect, useState } from 'react';
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
import { IMovie } from '../redux/actions';

const App: React.FC = () => {
  const cachedMovies = useSelector((state: IMoviesState) => state.movies)
  const { loading, error, data } = useQuery(GET_ALL_FILMS);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    console.log("app", loading, error, data);

  }, [loading, error, data]);

  useEffect(() => {
    if (data) {

      const parsedData = data.allFilms.films.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        planets: [],
      }))

      setMovies([...parsedData, ...cachedMovies])
    }

  }, [cachedMovies, data]);

  return (
    <main className="app">
      <header className="logo" >
        <Logo />
      </header>

      {loading ?
        <span>Loading</span> :
        movies.map((film: any) => {
          return (
            <SortableTable key={film.id} title={film.title} id={film.id} cacheData={film.planets} />
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
