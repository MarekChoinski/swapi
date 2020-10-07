import React, { useEffect, useState } from "react"
import { ReactComponent as ArrowOpen } from '../assets/arrowOpen.svg';
import { ReactComponent as ArrowClose } from '../assets/arrowClose.svg';
import { Planet, planetLabels } from "../interfaces/Planet.interface";

type Props = {
    data: Planet[],
};

const sortByKey = (array: any[], key: string) => {
    return array.sort((a, b) => {
        const x = a[key];
        const y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

const SortableTable: React.FC<Props> = props => {

    const {
        data
    } = props;

    const [ascending, setAscending] = useState(true);
    const [sortMethod, setSortMethod] = useState("name");
    const [sortedData, setSortedData] = useState<Planet[]>(data);

    useEffect(() => {
        //NOTE: sorting is inplace, so need to make new array
        const newSorted = [...sortedData];
        setSortedData(sortByKey(newSorted, sortMethod));
        console.log(sortedData);

    }, [ascending, sortMethod]);

    return (
        <table className="sortableTable">
            <tr>
                {
                    Object.keys(sortedData[0]).map((k) => {
                        return (<th
                            key={k}
                            onClick={() => { setSortMethod(k) }}
                        >
                            <span className="sort-by">
                                {(planetLabels as any)[k]}
                            </span>
                        </th>)
                    })
                }
            </tr>
            {
                sortedData.map(planet => {
                    console.log(planet.name);

                    return (
                        <tr key={planet.name}>
                            {Object.values(planet).map((v) => {
                                // NOTE: climate is array, but in mockup it is value
                                if (Array.isArray(v)) {
                                    v = v[0];
                                }
                                return (<td key={v}>{v}</td>)
                            })}
                        </tr>
                    );
                }
                )
            }
        </table>
    );
}

export default SortableTable;