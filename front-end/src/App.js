
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes} from "react-router-dom"

import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Footer from './components/Footer';
import SignUp from "./pages/SignUp"
import PrivateComponent from './components/PrivateComponent';

function App() {
  return (
    <>
      <Navbar/>
   
     <Routes>
       
         <Route element={<PrivateComponent/>}> 

        <Route path='/' element={ <Products/>}/>
        <Route path='/add' element={ <AddProduct/>}/>
        <Route path='/update' element={ <UpdateProduct/>}/>
        <Route path='/logout' element={ <Logout/>}/>
        <Route path='/profile' element={ <Profile/>}/>
        
        </Route>

        <Route path='/signup' element={ <SignUp/>}/>

     </Routes>
      <Footer/>
     
    </>
  );
}

export default App;
