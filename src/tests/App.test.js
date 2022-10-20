import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import testData from '../../cypress/mocks/testData';
import App from '../App';

describe('Testes', () => {
  test.only('Table', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));

    const { debug } = render(<App />);
    debug();
    await waitFor(() => {
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument()
    });
    }
  );
  
  test('Filter', () => {
    render(<App />);
    const filterName = screen.getByTestId('name-filter');
    expect(filterName).toBeInTheDocument();
  
    }
  );
});



