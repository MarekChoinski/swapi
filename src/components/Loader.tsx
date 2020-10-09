import React from 'react';
import { ReactComponent as LoaderSVG } from '../assets/loader.svg';

const Loader: React.FC = () => {

    return (
        <div className="loader">
            <LoaderSVG />
        </div>
    );
}

export default Loader;
