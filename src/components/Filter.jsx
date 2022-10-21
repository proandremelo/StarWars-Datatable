import React, { useContext } from 'react';

import TableContext from '../context/TableContext';

const COMPARISON = ['maior que', 'menor que', 'igual a'];

function Filter() {
  const {
    setNameToFilter,
    actualFilter,
    setActualFilter,
    filters,
    setFilters,
    column,
    setColumn,
  } = useContext(TableContext);
  const handleFilterByName = ({ target }) => {
    setNameToFilter(target.value);
  };

  const handleFilterChange = ({ target: { name, value } }) => {
    setActualFilter({ ...actualFilter, [name]: value });
  };

  const handleFilterClick = () => {
    console.log(actualFilter);
    const newFilters = [...filters, actualFilter];
    setFilters(newFilters);
    const filteredColumns = column.filter((col) => col !== actualFilter.column);
    setColumn(filteredColumns);
    setActualFilter({ ...actualFilter, column: filteredColumns[0] });
  };

  const removeFilter = ({ target }) => {
    const newFilteredOption = filters.filter((filt) => filt.column !== target.name);
    setFilters(newFilteredOption);
    setActualFilter({ ...actualFilter, column: newFilteredOption[0] });
    setColumn([...column, target.name]);
  };

  const removeAllFilters = () => {
    setFilters([]);
    setColumn([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setActualFilter({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
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
      <section>
        <select
          name="column"
          value={ actualFilter.column }
          data-testid="column-filter"
          onChange={ handleFilterChange }
        >
          {column.map((option) => (
            <option
              key={ option }
            >
              { option }
            </option>
          ))}
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
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover Filtros
        </button>
      </section>
      <section>
        {
          filters.map((filt, index) => (
            <div key={ index } data-testid="filter">
              {`${filt.column} ${filt.comparison} ${filt.value}` }
              <button
                type="button"
                name={ filt.column }
                onClick={ removeFilter }
              >
                Remover
              </button>
            </div>
          ))
        }
      </section>
    </section>
  );
}

export default Filter;
