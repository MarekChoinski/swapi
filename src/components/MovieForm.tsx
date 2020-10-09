import { useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { GET_ALL_PLANETS } from '../queries/getAllPlanets';
import Collapse from './Collapse';
import { ReactComponent as Delete } from '../assets/delete.svg';
import { useForm } from "react-hook-form";
import SelectSearch from 'react-select-search';
import { useDispatch } from 'react-redux';
import { addMovie } from '../redux/actions';

const MovieForm: React.FC = () => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(true);
    const [actualPlanetSelect, setActualPlanetSelect] = useState("");
    const [actualPlanets, setActualPlanets] = useState<string[]>([]);

    const { loading, error, data } = useQuery(GET_ALL_PLANETS);
    useEffect(() => {
        console.log(loading, error, data);

    }, [loading, error, data]);

    const { handleSubmit, register, reset, errors } = useForm();
    const onSubmit = (values: any) => {
        const result = {
            ...values,
            planets: [...actualPlanets]
        }
        setActualPlanetSelect("");
        setActualPlanets([]);
        reset();
        dispatch(addMovie(result.title, result.planets));
    };

    const addPlanet = (planetName: any) => {
        if (!actualPlanets.includes(planetName)) {
            setActualPlanets([...actualPlanets, planetName]);
        }
        setActualPlanetSelect("");
    };

    const removePlanet = (planetName: any) => {
        let newPlanets = [...actualPlanets].filter(p => p !== planetName);
        setActualPlanets(newPlanets);
    };

    return (
        <Collapse
            title="Add movie"
            show={show}
            onClick={() => { setShow(!show) }}
        >
            {!loading ?
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="movieForm"
                >
                    <label className="movieForm__label">
                        Movie title
                    </label>
                    <input
                        name="title"
                        ref={register({
                            required: "You need to insert title",
                            minLength: {
                                value: 3,
                                message: 'Title must contain at least 3 letters'
                            },
                            maxLength: {
                                value: 20,
                                message: 'Title is too long'
                            },
                            // pattern: {
                            //     value: /^[A-Z]*$/,
                            //     message: 'Title must start with capital letter'
                            // }
                        }
                        )}
                    //Movie tittle name must start with a capital letter.
                    />
                    {errors.title &&
                        <label className="movieForm__error">
                            {errors.title.message}
                        </label>
                    }

                    <div className="planetBox">
                        {actualPlanets.map((planet: any) => {
                            return <div
                                key={planet}
                                onClick={(() => removePlanet(planet))}
                                className="planetBox__planet"
                            >
                                {planet} <Delete />
                            </div>
                        })}
                    </div>

                    <label className="movieForm__label">
                        Add Planet
                    </label>

                    <SelectSearch
                        options={
                            data.allPlanets.planets.map((planet: any) => ({
                                name: planet.name,
                                value: planet.name,
                            }))
                        }
                        search
                        placeholder="Search for the the planet in database"
                        className="select"
                        onChange={addPlanet}
                        value={actualPlanetSelect}
                    />

                    <button
                        type="submit"
                        className="movieForm__button"
                    >
                        ADD MOVIE
                    </button>
                </form> :
                (<span>Loading</span>)
            }
        </Collapse>
    );
}

export default MovieForm;
