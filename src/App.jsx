import { Route, Routes } from "react-router-dom"
import './App.css';
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import TokoDetail from "./Pages/TokoDetail";
import Register from "./Pages/Register";
import Login from "./Pages/login";
import PrivateRoutes from "./route/privateRoutes";
import Productdetail from "./Pages/Productdetail";
import User from "./Pages/User";
import Kategori from "./Pages/Kategori";
import LogOut from "./Pages/Logout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/toko/:idToko" element={<TokoDetail />} />
          <Route path="/toko/:idToko/:idProduct" element={<Productdetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/logout" element={<LogOut />} />

          
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>)
}

export default App;
