import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import ChangeColor from "../../../Settings/ChangeColor/ChangeColor";
import configureStore from 'redux-mock-store';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from "components/__tests__/provider";

it("render component", async () => {

  renderWithProviders(<ChangeColor />)
  expect(screen.getByText(/testas/i)).toBeInTheDocument()

});
