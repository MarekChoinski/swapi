import { Planet } from "../interfaces/Planet.interface";
import { v4 as uuidv4 } from 'uuid';

export interface IMovie {
    id: string,
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
            id: uuidv4(),
            title,
            planets
        }
    },
});