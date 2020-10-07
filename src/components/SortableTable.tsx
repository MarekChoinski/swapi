import React, { useState } from "react"
import { ReactComponent as ArrowOpen } from '../assets/arrowOpen.svg';
import { ReactComponent as ArrowClose } from '../assets/arrowClose.svg';
import { Planet, planetLabels } from "../interfaces/Planet.interface";

type Props = {
    data: Planet[],
};

const SortableTable: React.FC<Props> = props => {

    const {
        data
    } = props;

    const keys: React.ReactNode = Object.keys(data[0]).map((k) => {
        return (<th key={k}>
            <span className="sort-by">
                {(planetLabels as any)[k]}
            </span>
        </th>)
    });

    return (
        <table className="sortableTable">
            <tr>
                {keys}
            </tr>
            {
                data.map(planet => {
                    return (
                        <tr>
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