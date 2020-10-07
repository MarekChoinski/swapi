import React from 'react';
import Collapse from './Collapse';
import { ReactComponent as Logo } from '../assets/logo.svg';
import SortableTable from './SortableTable';

const data = [
  {
    "name": "Tatooine",
    "rotationPeriod": 23,
    "orbitalPeriod": 304,
    "diameter": 10465,
    "climates": [
      "arid"
    ],
    "surfaceWater": 1,
    "population": 200000
  },
  {
    "name": "Alderaan",
    "rotationPeriod": 24,
    "orbitalPeriod": 364,
    "diameter": 12500,
    "climates": [
      "temperate"
    ],
    "surfaceWater": 40,
    "population": 2000000000
  },
  {
    "name": "Yavin IV",
    "rotationPeriod": 24,
    "orbitalPeriod": 4818,
    "diameter": 10200,
    "climates": [
      "temperate",
      "tropical"
    ],
    "surfaceWater": 8,
    "population": 1000
  }
];






const App: React.FC = () => {
  return (
    <main className="app">
      <header className="logo" >
        <Logo />
      </header>
      <Collapse title="Test something">
        <SortableTable data={data} />
      </Collapse>
      <Collapse title="Test something">
        <SortableTable data={data} />
      </Collapse>
    </main>
  );
}

export default App;
