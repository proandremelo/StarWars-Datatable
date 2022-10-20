import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('Testes', () => {
  test('Table', async () => {
    render(<App />);
    // const table = await screen.findByRole('table');
    // expect(table).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument()
    })
    }
  );
  
  test('Filter', () => {
    render(<App />);
    const filterName = screen.getByTestId('name-filter');
    expect(filterName).toBeInTheDocument();
  
    }
  );
});



