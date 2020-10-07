import React, { useState } from "react"
import { ReactComponent as ArrowOpen } from '../assets/arrowOpen.svg';
import { ReactComponent as ArrowClose } from '../assets/arrowClose.svg';

type Props = {
    children: React.ReactNode,
    title: string,
};

const Collapse: React.FC<Props> = props => {

    const {
        children,
        title
    } = props;

    const [show, setShow] = useState(false);

    return (
        <section className="collapse">
            <div className="collapse__bar"
                onClick={() => setShow(!show)}>
                <header className="collapse__title">
                    {title}
                </header>
                {show ? <ArrowClose /> : <ArrowOpen />}

            </div>
            <div className={`collapse__content ${show && "collapse__content--show"}`}>
                {children}
            </div>
        </section>

    );
}

export default Collapse;