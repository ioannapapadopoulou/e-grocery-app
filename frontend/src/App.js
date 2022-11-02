import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import ProductDetails from './sections/products/ProductDetails';
import HomeScreen from './sections/products/Products';
import Nav from './sections/navigation/Nav';
import Footer from './sections/footer/Footer';
import Signin from './sections/signin/Singin';
import Signup from './sections/signin/Signup';
import Cart from './sections/shoppingCart/ShoppingCart';
import Shipping from './sections/order/order/Shipping';
import Payment from './sections/order/payment/Payment';
import PlaceOrder from './sections/order/order/PlaceOrder';
import Order from './sections/order/order/Order';
import ProductForm from './sections/Admin/ProductForm';
import OrdersListAdmin from './sections/Admin/OrdersListAdmin';
import ProductOnSale from './sections/products/ProductOnSale';
import ProductsAdmin from './sections/Admin/ProductsAdmin';
import OrderHistory from './sections/userActivities/OrderHistory';
import UserListAdmin from './sections/Admin/UserListAdmin';
import SearchBox from './sections/search/SearchBox';
import HomePage from './sections/homepage/HomePage';
import AdminRoute from './components/routes/AdminRoute';
import Map from './sections/homepage/Map';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/cart/:id?" component={Cart}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/product/:id" component={ProductDetails} exact></Route>
        <Route path="/homepage" component={HomeScreen}></Route>
        <Route path="/shipping" component={Shipping}></Route>
        <Route path="/payment" component={Payment}></Route>
        <Route path="/orderHistory" component={OrderHistory}></Route>
        <Route path="/order/:id" component={Order}></Route>
        <Route path="/placeorder" component={PlaceOrder}></Route>
        <Route path="/products/:id/edit" component={ProductForm}></Route>
        <Route path="/search/title/:title?" component={SearchBox} exact></Route>
        <Route path="/map" component={Map}></Route>
        <Route path="/search/sales" component={ProductOnSale}></Route>
        <Route
          path="/search/category/:category"
          component={SearchBox}
          exact
        ></Route>
        <Route
          path="/search/category/:category/title/:title"
          component={SearchBox}
          exact
        ></Route>
        <Route path="/search/id/:id" component={ProductsAdmin} exact></Route>

        <AdminRoute
          path="/productList"
          component={ProductsAdmin}
          exact
        ></AdminRoute>
        <AdminRoute
          path="/orderList"
          component={OrdersListAdmin}
          exact
        ></AdminRoute>
        <AdminRoute path="/userList" component={UserListAdmin}></AdminRoute>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
