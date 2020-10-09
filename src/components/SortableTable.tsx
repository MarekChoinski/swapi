import React, { useCallback, useEffect, useState } from "react"
import { Planet, planetLabels } from "../interfaces/Planet.interface";
import Collapse from "./Collapse";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { sortByKey } from "../utils";
import { GET_FILM } from "../queries/getFilm";

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
    const [sortedData, setSortedData] = useState<Planet[]>(cacheData);
    const [show, setShow] = useState(false);

    const [getFilm, { loading, data }] = useLazyQuery(GET_FILM);

    useEffect(() => {
        // when data fetched
        if (data) {

            let newSorted;
            // fresh fetch
            if (!sortedData.length) {
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
                console.log("data is cached", cacheData);

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
                                                    return (<td key={v}>unknown</td>);
                                                }

                                                return (<td key={v}>{v}</td>);
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