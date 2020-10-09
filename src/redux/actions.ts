import { Planet } from "../interfaces/Planet.interface";

export interface IMovie {
    title: string,
    planets: Planet[]
}

export interface IAddMovie {
    type: "ADD_MOVIE";
    payload: {
        movie: IMovie
    }
}

export const addMovie = (title: string, planets: Planet[]): IAddMovie => ({
    type: "ADD_MOVIE",
    payload: {
        movie: {
            title,
            planets
        }
    },
});