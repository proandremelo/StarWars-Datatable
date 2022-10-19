import React, { useState, useEffect } from 'react';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [filtereds, setFiltereds] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setPlanets(results);
    };
    fetchPlanets();
  }, []);

  const handleFilterByName = ({ target }) => {
    setFiltereds(planets.filter((planet) => planet.name
      .toLowerCase().includes(target.value.toLowerCase())));
  };

  const renderTableBody = (array) => (
    array.map((planet, index) => (
      <tr key={ index }>
        {Object.keys(planet).filter((col) => col !== 'residents')
          .map((data, i) => (
            <td key={ i }>{ planet[data] }</td>))}
      </tr>))
  );

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleFilterByName }
      />
      {
        (planets.length > 0) && (
          <table>
            <thead>
              <tr>
                {Object.keys(planets[0]).filter((col) => col !== 'residents')
                  .map((header, index) => <th key={ index }>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {
                (filtereds.length > 0)
                  ? renderTableBody(filtereds)
                  : renderTableBody(planets)
              }
            </tbody>
          </table>
        )
      }
    </section>
  );
}

export default Table;
