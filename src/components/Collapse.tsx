import React, { useState } from "react"
import { ReactComponent as ArrowOpen } from '../assets/arrowOpen.svg';
import { ReactComponent as ArrowClose } from '../assets/arrowClose.svg';
import SortableTable from "./SortableTable";

type Props = {
    title: string,
    id: string,
};

const Collapse: React.FC<Props> = props => {

    const {
        title,
        id,
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
                {/* <SortableTable data={data2.data.film.planetConnection.planets} /> */}
                <span>test</span>
            </div>
        </section>

    );
}

export default Collapse;