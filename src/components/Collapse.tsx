import React, { ReactElement } from "react"
import { ReactComponent as ArrowOpen } from '../assets/arrowOpen.svg';

type Props = {
    children: React.ReactNode,
    title: string,
};

const Collapse: React.FC<Props> = props => {

    const {
        children,
        title
    } = props;

    return (
        <section className="collapse">
            <header>
                <span className="collapse__title">
                    {title}
                </span>
                <ArrowOpen />
            </header>
        </section>

    );
}

export default Collapse;