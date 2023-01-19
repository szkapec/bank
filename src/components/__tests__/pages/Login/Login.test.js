import { fireEvent, waitFor } from "@testing-library/react";
import Login from "components/pages/Login/Login";
import "@testing-library/jest-dom/extend-expect";
import { renderWithProviders } from "components/__tests__/provider";
import { I18nextProvider } from 'react-i18next'
import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";

describe("Login", () => {
  test('test-login-failed-emailAndPassword', async () => {
    const history = createMemoryHistory();

    const { getByText, getByPlaceholderText, getByAltText, container } = renderWithProviders(
      <I18nextProvider>
         <MemoryRouter history={history}>
          <Login/>
         </MemoryRouter>
      </I18nextProvider>
    )
    expect(getByText(/login.rememberPassword/i)).toBeInTheDocument()
    expect(getByPlaceholderText(/login.enterEmail/i)).toBeInTheDocument()
    expect(getByAltText(/logo/i)).toBeInTheDocument()
    expect(getByText(/login.send/i)).toBeInTheDocument()
  
    fireEvent.change(getByPlaceholderText(/login.enterEmail/i), {target: {value: 'test@o2.pl'}})
    fireEvent.change(getByPlaceholderText(/login.enterPassword/i), {target: {value: 'password'}})
    expect(getByPlaceholderText(/login.enterEmail/i).value).toEqual('test@o2.pl')
    expect(getByPlaceholderText(/login.enterPassword/i).value).toEqual('password')
  
    fireEvent.click(getByText(/login.send/i))
    const errorMessage = await waitFor(() => getByText(/Nie ma takiego użytkownika o takim e-mail/i))
    expect(errorMessage).toBeInTheDocument();
  })

  it('test-login-failed-password', async () => {
    const history = createMemoryHistory();
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <I18nextProvider>
         <MemoryRouter history={history}>
          <Login/>
         </MemoryRouter>
      </I18nextProvider>
    )
    fireEvent.change(getByPlaceholderText(/login.enterEmail/i), {target: {value: 'a@o2.pl'}})
    fireEvent.change(getByPlaceholderText(/login.enterPassword/i), {target: {value: '12345'}})
    fireEvent.click(getByText(/login.send/i))
    const errorMessage = await waitFor(() => getByText(/Hasło nie pasuje/i))
    expect(errorMessage).toBeInTheDocument();
  })

  it('test-login-passed', async () => {
    const history = createMemoryHistory();
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <I18nextProvider>
         <MemoryRouter history={history}>
          <Login/>
         </MemoryRouter>
      </I18nextProvider>
    )
    fireEvent.change(getByPlaceholderText(/login.enterEmail/i), {target: {value: 'a@o2.pl'}})
    fireEvent.change(getByPlaceholderText(/login.enterPassword/i), {target: {value: '1234'}})
    fireEvent.click(getByText(/login.send/i))
    const passedMessage = await waitFor(() => getByText(/Zalogowany/i))
    expect(passedMessage).toBeInTheDocument();
  })
});
