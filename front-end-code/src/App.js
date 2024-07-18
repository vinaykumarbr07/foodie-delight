import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, Outlet} from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import {Provider} from 'react-redux';
import store from './utils/store';
import Error from './components/Error';

const AppLayout = () => {
  return (
      <Provider store={store}>
        <div className="App">
          <Header/>
          <Outlet/>
        </div>
      </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children:[
      {
        path:'/',
        element:<Body/>
      }
    ],
    errorElement: <Error/>
  }
])

export default appRouter ;
