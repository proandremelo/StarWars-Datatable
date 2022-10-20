import React, { useContext } from 'react';

import TableContext from '../context/TableContext';

function Table() {
  const { planets, filtereds } = useContext(TableContext);

  const renderTableBody = (array) => (
    array.map((planet, index) => (
      <tr key={ index }>
        {Object.keys(planet).filter((col) => col !== 'residents')
          .map((data, i) => (
            <td key={ i }>{ planet[data] }</td>))}
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
                  (filtereds.length > 0)
                    ? renderTableBody(filtereds)
                    : renderTableBody(planets)
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
