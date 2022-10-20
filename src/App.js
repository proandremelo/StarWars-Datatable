import React from 'react';
import './App.css';

import TableProvider from './context/TableProvider';
import Home from './pages/Home';

function App() {
  return (
    <TableProvider>
      <Home />
    </TableProvider>
  );
}

export default App;
