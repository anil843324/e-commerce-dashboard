
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes} from "react-router-dom"

import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import Profile from './pages/Profile';
import Logout from './pages/Logout';

function App() {
  return (
    <>
      <Navbar/>
   
     <Routes>
 
        <Route path='/' element={ <Products/>}/>
        <Route path='/add' element={ <AddProduct/>}/>
        <Route path='/update' element={ <UpdateProduct/>}/>
        <Route path='/logout' element={ <Logout/>}/>
        <Route path='/profile' element={ <Profile/>}/>
 

     </Routes>
   
     
    </>
  );
}

export default App;
