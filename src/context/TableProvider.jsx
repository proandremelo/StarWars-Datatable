import React, { useState, useMemo, useEffect } from 'react';
import { element } from 'prop-types';

import TableContext from './TableContext';

const INITIAL_FILTER = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

const COLUMN = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function TableProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [actualFilter, setActualFilter] = useState(INITIAL_FILTER);
  const [filters, setFilters] = useState([]);
  const [column, setColumn] = useState(COLUMN);
  const [nameToFilter, setNameToFilter] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setPlanets(results);
    };
    fetchPlanets();
  }, []);

  const dependencies = useMemo(() => ({
    planets,
    nameToFilter,
    actualFilter,
    filters,
    column,
    setPlanets,
    setNameToFilter,
    setActualFilter,
    setFilters,
    setColumn,
  }), [planets, nameToFilter, actualFilter, filters, column]);

  return (
    <TableContext.Provider value={ dependencies }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: element.isRequired,
};

export default TableProvider;
