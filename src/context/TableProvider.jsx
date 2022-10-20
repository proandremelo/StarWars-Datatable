import React, { useState, useMemo, useEffect } from 'react';
import { element } from 'prop-types';

import TableContext from './TableContext';

const INITIAL_FILTER = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

function TableProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [actualFilter, setActualFilter] = useState(INITIAL_FILTER);
  const [filters, setFilters] = useState([]);

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
    filteredPlanets,
    actualFilter,
    filters,
    setPlanets,
    setFilteredPlanets,
    setActualFilter,
    setFilters,
  }), [planets, filteredPlanets, actualFilter, filters]);

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
