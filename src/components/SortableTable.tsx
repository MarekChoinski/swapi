import React, { useState } from "react"
import { ReactComponent as ArrowOpen } from '../assets/arrowOpen.svg';
import { ReactComponent as ArrowClose } from '../assets/arrowClose.svg';

type Props = {
    data: any[],
};

const SortableTable: React.FC<Props> = props => {

    const {
        data
    } = props;

    const [show, setShow] = useState(true);

    return (
        <span>test</span>

    );
}

export default SortableTable;