import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ReactComponent as ArrowOpen } from '../assets/arrowOpen.svg';
import { ReactComponent as ArrowClose } from '../assets/arrowClose.svg';


type Props = {
    title: string,
    children: React.ReactNode,
    show: boolean,
    onClick: () => void,
};

const Collapse: React.FC<Props> = props => {

    const {
        title,
        children,
        show,
        onClick
    } = props;

    return (
        <section className="collapse">
            <div className="collapse__bar"
                onClick={onClick}>
                <header className="collapse__title">
                    {title}
                </header>
                {show ? <ArrowClose /> : <ArrowOpen />}

            </div >
            <div className={`collapse__content ${show && "collapse__content--show"}`}>
                {children}
            </div>
        </section >

    );
}

export default Collapse;