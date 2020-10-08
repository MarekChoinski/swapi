import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ALL_PLANETS } from '../queries/getAllPlanets';
import Collapse from './Collapse';

import { useForm } from "react-hook-form";
import SelectSearch from 'react-select-search';

const MovieForm: React.FC = () => {

    const [show, setShow] = useState(true);
    const [actualPlanetSelect, setActualPlanetSelect] = useState("");
    const [actualPlanets, setActualPlanets] = useState<string[]>([]);

    const { loading, error, data } = useQuery(GET_ALL_PLANETS);
    useEffect(() => {
        console.log(loading, error, data);

    }, [loading, error, data]);

    const { handleSubmit, register, errors } = useForm();
    const onSubmit = (values: any) => console.log(values);

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
                            required: "Required",
                        })}
                    />
                    {errors.title && errors.title.message}

                    {actualPlanets.map((planet: any) => {
                        return <div
                            key={planet}
                            onClick={(() => removePlanet(planet))}
                        >
                            {planet}
                        </div>
                    })}

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
                        placeholder="Select your country"
                        className="select"
                        onChange={addPlanet}
                        value={actualPlanetSelect}
                    />

                    {errors.username && errors.username.message}

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
