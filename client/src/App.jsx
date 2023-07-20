import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Header from "./components/Layout/Header";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import ProductDetails from "./pages/ProductDeatils";
import Footer from "./components/Layout/Footer";
import Search from "./pages/Search";
import AllProducts from "./pages/AllProducts";
import CartPage from "./pages/CartPage";
import UserDashboard from "./pages/user/Dashboard";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import PrivateRoute from "./components/Routes/Private";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Header /> */}
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/orders" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
        </Route>
      </Route>
      {/* <Footer /> */}
    </>
  )
);

function App({ routes }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
