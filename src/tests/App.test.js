import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import testData from '../../cypress/mocks/testData';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));
  });

  test('Render Filter', () => {
    render(<App />);
    const filterName = screen.getByTestId('name-filter');
    expect(filterName).toBeInTheDocument();
  
    }
  );

  test('Population > 10000', async () => {

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    });

    const filtrar = screen.getByTestId('button-filter');
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    userEvent.selectOptions(column, 'population');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(value, '10000');
    userEvent.click(filtrar);
    const tatooine = await screen.findByRole('cell', { name: 'Tatooine' });
    expect(tatooine).toBeInTheDocument();
    }
  );

  test('Orbital Period < 500', async () => {

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    });

    const filtrar = screen.getByTestId('button-filter');
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    userEvent.selectOptions(column, 'orbital_period');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '500');
    userEvent.click(filtrar);
    const tatooine = await screen.findByText(/tatooine/i);
    expect(tatooine).toBeInTheDocument();
    }
  );

  test('Rotation Period === 12', async () => {

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    });

    const filtrar = screen.getByTestId('button-filter');
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    userEvent.selectOptions(column, 'rotation_period');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value, '12');
    userEvent.click(filtrar);
    const bespin = await screen.findByText(/bespin/i);
    expect(bespin).toBeInTheDocument();
    }
  );

  test('Filter By Name', async () => {

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    });

    const inputName = screen.getByTestId('name-filter');
    userEvent.type(inputName, 'bespin');
    const bespin = await screen.findByText(/bespin/i);
    expect(bespin).toBeInTheDocument();
    }
  );

  test('Remove All Filters', async () => {

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    });

    const filtrar = screen.getByTestId('button-filter');
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    userEvent.selectOptions(column, 'rotation_period');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value, '12');
    userEvent.click(filtrar);
    const filter = await screen.findByTestId('filter');
    expect(filter).toBeInTheDocument();
    const remover = screen.getByText('Remover');
    userEvent.click(remover);
    expect(filter).not.toBeInTheDocument();
    }
  );

});



