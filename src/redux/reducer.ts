
import { addMovie, IAddMovie, IMovie } from './actions';

export interface IMoviesState {
    readonly movies: IMovie[],
}

const initialState: IMoviesState = {
    movies: [],
};

const reducer = (
    state = initialState,
    action: IAddMovie,
): IMoviesState => {

    switch (action.type) {
        case "ADD_MOVIE":
            return {
                ...state,
                movies: [...state.movies, action.payload.movie,]
            }
        default:
            return state;
    }
};

export default reducer;