import React, { useCallback, useEffect, useState } from "react"
import { Planet, planetLabels } from "../interfaces/Planet.interface";
import Collapse from "./Collapse";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { sortByKey } from "../utils";
import { GET_FILM } from "../queries/getFilm";
import { GET_ALL_PLANETS } from "../queries/getAllPlanets";
import { GET_ALL_PLANETS_DATA } from "../queries/getAllPlanetsData";

type Props = {
    cacheData?: Planet[],
    title: string,
    id: string,
};

const SortableTable: React.FC<Props> = props => {

    const {
        cacheData = [],
        title,
        id,
    } = props;

    const [ascending, setAscending] = useState(false);
    const [sortMethod, setSortMethod] = useState("name");
    const [sortedData, setSortedData] = useState<Planet[]>([]);
    // const [parsedCachedData, setParsedCachedData] = useState<Planet[]>([]);
    const [show, setShow] = useState(false);

    const [getFilm, { loading, data }] = useLazyQuery(GET_FILM);

    const [getAllPlanetsData] = useLazyQuery(GET_ALL_PLANETS_DATA, {
        onCompleted: (data2: any) => {
            if (data2) {
                let newSorted = [...data2.allPlanets.planets.filter((p: any) => cacheData.includes(p.name))]
                setSortedData(sortByKey(newSorted, sortMethod, ascending));
            }
        }
    });

    useEffect(() => {
        // when data fetched
        if (data || cacheData.length) {

            console.log("data", data);
            console.log("sortedData", sortedData);


            let newSorted;
            // fresh fetch

            if (data && !sortedData.length) {
                newSorted = [...data.film.planetConnection.planets];
            }
            else {
                //NOTE: sorting is inplace, so need to make new array
                newSorted = [...sortedData];
            }
            setSortedData(sortByKey(newSorted, sortMethod, ascending));
        }

    }, [ascending, sortMethod, data]);

    const setSortingMethodWithAscending = useCallback(
        (method: string) => {
            if (method == sortMethod) {
                setAscending(!ascending);
            }
            else {
                setSortMethod(method);
                setAscending(false);
            }
        },
        [sortMethod, ascending],
    );

    const setShowFetchData = () => {
        if (!sortedData.length && !show) {
            if (!cacheData.length) {
                getFilm({ variables: { id } })
            }
            //data is cached
            else {
                getAllPlanetsData();
            }
        }
        setShow(!show);
    };

    return (
        <Collapse title={title} show={show} onClick={setShowFetchData}>
            {!loading && sortedData.length ?

                <table className="sortableTable">
                    <tbody>


                        <tr>
                            {
                                Object.keys(sortedData[0]).map((k) => {
                                    if (k !== '__typename')
                                        return (<th
                                            key={k}
                                            onClick={() => { setSortingMethodWithAscending(k) }}
                                        >
                                            <span className={`
                                            sortBy 
                                            ${k === sortMethod ? "actualMethod" : ""}
                                            ${(k === sortMethod && ascending) ? "ascending" : ""}
                                            ${(k === sortMethod && !ascending) ? "descending" : ""}
                                            `}
                                            >
                                                {(planetLabels as any)[k]}
                                            </span>
                                        </th>)
                                })
                            }
                        </tr>
                        {
                            sortedData.map(planet => {
                                return (
                                    <tr key={planet.name}>
                                        {Object.entries(planet).map(([k, v], _) => {
                                            // NOTE: climate is array, but in mockup it is value
                                            if (Array.isArray(v)) {
                                                v = v[0];
                                            }
                                            if (k !== '__typename') {
                                                if (v === null) {
                                                    return (<td key={planet.name + k}>unknown</td>);
                                                }
                                                return (<td key={planet.name + k}>{v}</td>);
                                            }

                                        })}
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table> :
                <div>LOADING</div>
            }
        </Collapse>
    );
}

export default SortableTable;