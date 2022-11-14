import React, { useContext } from 'react';

import TableContext from '../context/TableContext';

import '../styles/Table.css';

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
        <div>
          <tr key={ index }>
          {Object.keys(planet).filter((col) => col !== 'residents')
            .map((data, i) => (
              <td data-testid="planet" key={ i }>
                <div>
                  { planet[data] }
                </div>
              </td>))}
          </tr>
        </div>
        ))
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
                <div>
                  <tr>
                    {
                      renderTableHeader()
                    }
                  </tr>
                </div>
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
