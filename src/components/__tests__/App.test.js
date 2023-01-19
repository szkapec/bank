import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../../src/App';
import "@testing-library/jest-dom/extend-expect";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
 
// it('Renders without crashing', () => {
//   const div = document.createElement("div");

//   const initialState = { output: 10 };
//   const mockStore = configureStore();
//   let store;

//   store = mockStore(initialState);
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>, div
//   );

//   ReactDOM.unmountComponentAtNode(div)
// })


it('full app rendering/navigating', async () => {

  // render(<App />)
  // const user = userEvent.setup()

  // verify page content for default route
  // expect(screen.getByText(/you are home/i)).toBeInTheDocument()

  // // verify page content for expected route after navigating
  // await user.click(screen.getByText(/about/i))
  // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
})