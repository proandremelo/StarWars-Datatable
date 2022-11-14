import React from 'react';

import Table from '../components/Table';
import Filter from '../components/Filter';

import '../styles/Home.css';

function Home() {
  return (
    <section className="home-section">
      <Filter />
      <Table />
    </section>
  );
}

export default Home;
