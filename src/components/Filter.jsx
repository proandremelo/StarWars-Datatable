import React, { useContext } from 'react';

import TableContext from '../context/TableContext';

const COMPARISON = ['maior que', 'menor que', 'igual a'];
const COLUMN = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Filter() {
  const {
    planets,
    filteredPlanets,
    setFilteredPlanets,
    actualFilter,
    setActualFilter,
    filters,
    setFilters,
  } = useContext(TableContext);

  const handleFilterByName = ({ target }) => {
    setFilteredPlanets(planets.filter((planet) => planet.name
      .toLowerCase().includes(target.value.toLowerCase())));
  };

  const handleFilterChange = ({ target: { name, value } }) => {
    setActualFilter({ ...actualFilter, [name]: value });
  };

  const createOrigin = () => {
    console.log('filteredPlanets', filteredPlanets);
    console.log('planets', planets);
    let origin = [];
    if (filteredPlanets.length > 0) {
      origin = filteredPlanets;
    } else {
      origin = planets;
    }
    return origin;
  };

  const saveFilter = () => {
    setFilters([...filters, actualFilter]);
  };

  const filterSwitch = (origin) => {
    console.log('origin', origin);
    if (actualFilter.comparison === 'maior que') {
      console.log('maior que');
      const of = origin.filter((planet) => Number(planet[actualFilter.column])
      > Number(actualFilter.value));
      console.log('of', of);
      setFilteredPlanets(of);
    } else if (actualFilter.comparison === 'menor que') {
      const of = origin.filter((planet) => Number(planet[actualFilter.column])
        < Number(actualFilter.value));
      setFilteredPlanets(of);
    } else {
      const of = origin.filter((planet) => Number(planet[actualFilter.column])
        === Number(actualFilter.value));
      setFilteredPlanets(of);
    }
  };

  const handleFilterClick = () => {
    const origin = createOrigin();
    filterSwitch(origin);
    saveFilter();
  };

  return (
    <section>
      <section>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ handleFilterByName }
        />
      </section>
      <select
        name="column"
        value={ actualFilter.column }
        data-testid="column-filter"
        onChange={ handleFilterChange }
      >
        {COLUMN.filter((col) => {
          const cols = filters.map((filt) => filt.column);
          return !cols.includes(col);
        }).map((option) => <option key={ option }>{ option }</option>)}
      </select>
      <select
        name="comparison"
        value={ actualFilter.comparison }
        data-testid="comparison-filter"
        onChange={ handleFilterChange }
      >
        {COMPARISON.map((option) => <option key={ option }>{ option }</option>)}
      </select>
      <input
        name="value"
        type="number"
        value={ actualFilter.value }
        data-testid="value-filter"
        onChange={ handleFilterChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilterClick }
      >
        Filtrar
      </button>
    </section>
  );
}

export default Filter;
