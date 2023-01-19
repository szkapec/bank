import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from "components/__tests__/provider";
import Error from "components/Error/Error";

test("render component", async () => {

  const { getByText, rerender } = renderWithProviders(<Error />)
  expect(getByText(/Błąd np:/i)).toBeInTheDocument()

  rerender(<Error error="Error message" />);

  expect(getByText(/Error message/i)).toBeInTheDocument()
});