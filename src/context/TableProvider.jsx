import React, { useState, useMemo, useEffect } from 'react';
import { element } from 'prop-types';

import TableContext from './TableContext';

const INITIAL_FILTERS = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

function TableProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filtereds, setFiltereds] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

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
    filtereds,
    filters,
    setPlanets,
    setFiltereds,
    setFilters,
  }), [planets, filtereds, filters]);

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
