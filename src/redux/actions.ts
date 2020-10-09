import { Planet } from "../interfaces/Planet.interface";

interface IAddMovie {
    type: "ADD_PLANET";
    payload: {
        title: string,
        planets: Planet[]
    };
}

export const addMovie = (title: string, planets: Planet[]): IAddMovie => ({
    type: "ADD_PLANET",
    payload: {
        title,
        planets
    },
});