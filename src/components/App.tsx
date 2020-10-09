import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import SortableTable from './SortableTable';
import { useQuery, gql } from '@apollo/client';
import Footer from './Footer';
import MovieForm from './MovieForm';
import { GET_ALL_FILMS } from '../queries/getAllFilms';
import { useSelector } from 'react-redux';
import { IMoviesState } from '../redux/reducer';
import { IMovie } from '../redux/actions';
import Loader from './Loader';

const App: React.FC = () => {
  const cachedMovies = useSelector((state: IMoviesState) => state.movies)
  const { loading, error, data } = useQuery(GET_ALL_FILMS);
  const [movies, setMovies] = useState<IMovie[]>([]);

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
        <Loader /> :
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
