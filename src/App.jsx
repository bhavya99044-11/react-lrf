import {Provider} from 'react-redux';
import { store } from "./app/store.js";
import { ToastContainer } from "react-toastify";
import { router } from "./routes/RoutesFile.jsx";
import { RouterProvider } from "react-router-dom";

import "./App.css";



function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
