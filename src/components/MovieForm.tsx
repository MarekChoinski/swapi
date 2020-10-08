import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ALL_PLANETS } from '../queries/getAllPlanets';
import Collapse from './Collapse';

const MovieForm: React.FC = () => {

    const [show, setShow] = useState(true);

    const { loading, error, data } = useQuery(GET_ALL_PLANETS);
    useEffect(() => {
        console.log(loading, error, data);

    }, [loading, error, data]);

    return (
        <Collapse
            title="Add movie"
            show={show}
            onClick={() => { setShow(!show) }}
        >
            <span>test</span>
        </Collapse>
    );
}

export default MovieForm;
