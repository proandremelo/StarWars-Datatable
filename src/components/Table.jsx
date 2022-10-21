import React, { useContext } from 'react';

import TableContext from '../context/TableContext';

function Table() {
  const { planets, filters, nameToFilter } = useContext(TableContext);

  let of = [...planets];
  const filterSwitch = () => {
    filters.forEach((f) => {
      if (f.comparison === 'maior que') {
        of = of.filter((planet) => Number(planet[f.column])
        > Number(f.value));
      } else if (f.comparison === 'menor que') {
        of = of.filter((planet) => Number(planet[f.column])
          < Number(f.value));
      } else {
        of = of.filter((planet) => Number(planet[f.column])
          === Number(f.value));
      }
    });
    return of;
  };

  const renderTableBody = () => (

    filterSwitch().filter((p) => p.name.toLowerCase()
      .includes(nameToFilter.toLowerCase()))
      .map((planet, index) => (
        <tr key={ index }>
          {Object.keys(planet).filter((col) => col !== 'residents')
            .map((data, i) => (
              <td data-testid="planet" key={ i }>{ planet[data] }</td>))}
        </tr>))
  );

  const renderTableHeader = () => (
    Object.keys(planets[0]).filter((col) => col !== 'residents')
      .map((header, index) => <th key={ index }>{header}</th>)
  );

  return (
    <section>
      <section>
        {
          (planets.length > 0) && (
            <table>
              <thead>
                <tr>
                  {
                    renderTableHeader()
                  }
                </tr>
              </thead>
              <tbody>
                {
                  renderTableBody()
                }
              </tbody>
            </table>
          )
        }
      </section>
    </section>
  );
}

export default Table;
