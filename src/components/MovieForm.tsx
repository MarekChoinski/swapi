import React, { useEffect, useState } from 'react';
import Collapse from './Collapse';

const MovieForm: React.FC = () => {

    const [show, setShow] = useState(true);

    return (
        <Collapse
            title="Add movie"
            show={show}
            onClick={() => { setShow(!show) }}
        >
        </Collapse>
    );
}

export default MovieForm;
