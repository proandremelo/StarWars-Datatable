import React, { useState, useEffect } from 'react';

function Table() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setPlanets(results);
    };
    fetchPlanets();
  }, []);
  return (
    <section>
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
              {planets.map((planet, index) => (
                <tr key={ index }>
                  {Object.keys(planet).filter((col) => col !== 'residents')
                    .map((data, i) => (
                      <td key={ i }>{ planet[data] }</td>))}
                </tr>))}
            </tbody>
          </table>
        )
      }
    </section>
  );
}

export default Table;
