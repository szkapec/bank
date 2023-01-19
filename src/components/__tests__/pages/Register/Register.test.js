import { fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithProviders } from "components/__tests__/provider";
import { I18nextProvider } from 'react-i18next'
import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";
import Register from "components/pages/Register/Register";

describe("Register", () => {
  test('register-test', async () => {
    const history = createMemoryHistory();

    const { getByText, getByPlaceholderText, getByAltText, container } = renderWithProviders(
      <I18nextProvider>
         <MemoryRouter history={history}>
          <Register/>
         </MemoryRouter>
      </I18nextProvider>
    )
    // expect(getByPlaceholderText(/Name/i)).toBeInTheDocument()
    expect(getByPlaceholderText(/Surname/i)).toBeInTheDocument()
    expect(getByPlaceholderText(/Email/i)).toBeInTheDocument()
    // expect(getByPlaceholderText(/Password/i)).toBeInTheDocument()
    expect(getByPlaceholderText(/Repeat password/i)).toBeInTheDocument()


    // fireEvent.change(getByPlaceholderText(/login.enterEmail/i), {target: {value: 'test@o2.pl'}})
    // fireEvent.change(getByPlaceholderText(/login.enterPassword/i), {target: {value: 'password'}})
    // expect(getByPlaceholderText(/login.enterEmail/i).value).toEqual('test@o2.pl')
    // expect(getByPlaceholderText(/login.enterPassword/i).value).toEqual('password')
  
    // fireEvent.click(getByText(/login.send/i))
    // const errorMessage = await waitFor(() => getByText(/Nie ma takiego użytkownika o takim e-mail/i))
    // expect(errorMessage).toBeInTheDocument();
  })
});
