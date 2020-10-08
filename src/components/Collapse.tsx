import React, { useEffect, useState } from "react"
import { ReactComponent as ArrowOpen } from '../assets/arrowOpen.svg';
import { ReactComponent as ArrowClose } from '../assets/arrowClose.svg';
import SortableTable from "./SortableTable";
import { gql, useQuery } from "@apollo/client";
import { Planet } from "../interfaces/Planet.interface";

type Props = {
    title: string,
    id: string,
};

const GET_FILM = gql`
  query GetFilm($id: ID!){
    film(id: $id) {
      planetConnection{
        planets{
          name,
          rotationPeriod,
          orbitalPeriod,
          diameter,
          climates,
          surfaceWater,
          population
        }
      }
    }
  }
`;

const Collapse: React.FC<Props> = props => {

    const {
        title,
        id,
    } = props;

    const [show, setShow] = useState(false);
    const { loading, error, data } = useQuery(GET_FILM, {
        variables: { id },
    });

    useEffect(() => {
        console.log(id);
        console.log(loading, error, data);

    }, [loading, error, data]);

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
                {loading ?
                    <span>Loading</span> :
                    <SortableTable data={data.film.planetConnection.planets} />
                }
            </div>
        </section>

    );
}

export default Collapse;