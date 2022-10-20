import React, { useContext } from 'react';

import TableContext from '../context/TableContext';

const COMPARISON = ['maior que', 'menor que', 'igual a'];

function Filter() {
  const {
    planets,
    filtereds,
    setFiltereds,
    filters,
    setFilters,
  } = useContext(TableContext);

  const handleFilterByName = ({ target }) => {
    setFiltereds(planets.filter((planet) => planet.name
      .toLowerCase().includes(target.value.toLowerCase())));
  };

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters({ ...filters, [name]: value });
  };

  const createOrigin = () => {
    let origin = [];
    if (filtereds.length > 0) {
      origin = filtereds;
    } else {
      origin = planets;
    }
    return origin;
  };

  const filterSwitch = (origin) => {
    if (filters.comparison === 'maior que') {
      const filter = origin
        .filter((planet) => Number(planet[filters.column]) > Number(filters.value));
      setFiltereds(filter);
    } else if (filters.comparison === 'menor que') {
      const filter = origin
        .filter((planet) => Number(planet[filters.column]) < Number(filters.value));
      setFiltereds(filter);
    } else {
      const filter = origin
        .filter((planet) => Number(planet[filters.column]) === Number(filters.value));
      setFiltereds(filter);
    }
  };

  const handleFilterClick = () => {
    const origin = createOrigin();
    filterSwitch(origin);
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
        value={ filters.column }
        data-testid="column-filter"
        onChange={ handleFilterChange }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        name="comparison"
        value={ filters.comparison }
        data-testid="comparison-filter"
        onChange={ handleFilterChange }
      >
        {COMPARISON.map((option) => <option key={ option }>{ option }</option>)}
      </select>
      <input
        name="value"
        type="number"
        value={ filters.value }
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
