import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, Outlet} from 'react-router-dom';
import './App.css';
import HandleDialog from './utils/HandleDialog';
import { useState } from 'react';

const AppLayout = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
      <HandleDialog.Provider value={{isDialogOpen, setDialogOpen}}>
      <div className="App">
        <Header/>
        <Outlet/>
      </div>
      </HandleDialog.Provider>
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
    ]
  }
])

export default appRouter ;
